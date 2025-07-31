import { Router, Request, Response } from "express";
import { PrismaClient, tastings } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

type ExamKey = "visual" | "olfactory" | "taste" | "final";

const examTypes: Record<ExamKey, any> = {
  visual: prisma.visual_exams,
  olfactory: prisma.olfactory_exams,
  taste: prisma.taste_olfactory_exams,
  final: prisma.final_considerations
};

function omitIdTid<T extends { id?: any; tid?: any }>(exam: T | null) {
  if (!exam) return null;
  const { id, tid, ...rest } = exam;
  return rest;
}

// Extend Express Request to include `user`
interface AuthRequest extends Request {
  user: {
    uid: string;
    [key: string]: any;
  };
}

async function validateTastingOwnership(tid: string, uid: string, res: Response): Promise<tastings | null> {
  if (!tid || tid.length !== 36) {
    res.status(400).json({ error: `URL parameter 'tasting_uuid' is an invalid UUID-32` });
    return null;
  }

  const tasting = await prisma.tastings.findUnique({ where: { tid, uid } });
  if (!tasting) {
    res.status(404).json({ error: `Tasting ${tid} not found for user ${uid}` });
    return null;
  }

  return tasting;
}

router.get("/", (req: Request, res: Response) => {
  res.status(400).json({ error: `URL parameter 'tasting_uuid' is ${req.params.tid}` });
});

router.get("/:tid", async (req: AuthRequest, res: Response) => {
  const { tid } = req.params;
  const uid = req.user.uid;

  try {
    const tasting = await validateTastingOwnership(tid, uid, res);
    if (!tasting) return;

    const [visualExam, olfactoryExam, tasteOlfactoryExam, finalConsiderations] = await Promise.all([
      examTypes.visual.findMany({ where: { tid }, orderBy: { id: "desc" } }),
      examTypes.olfactory.findMany({ where: { tid }, orderBy: { id: "desc" } }),
      examTypes.taste.findMany({ where: { tid }, orderBy: { id: "desc" } }),
      examTypes.final.findMany({ where: { tid }, orderBy: { id: "desc" } })
    ]);

    [visualExam[0], olfactoryExam[0], tasteOlfactoryExam[0], finalConsiderations[0]].forEach(e => {
      if (e) {
        delete e.id;
        delete e.tid;
      }
    });

    res.json({
      tasting_uuid: tid,
      exams: {
        visual_exam: visualExam[0] ?? {},
        olfactory_exam: olfactoryExam[0] ?? {},
        taste_olfactory_exam: tasteOlfactoryExam[0] ?? {},
        final_considerations: finalConsiderations[0] ?? {}
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/:tid/:exam", async (req: AuthRequest, res: Response) => {
  const { tid, exam } = req.params;
  const uid = req.user.uid;

  if (!Object.keys(examTypes).includes(exam)) {
    return res.status(400).json({ error: `Invalid exam type '${exam}'` });
  }

  try {
    const tasting = await validateTastingOwnership(tid, uid, res);
    if (!tasting) return;

    const examData = await examTypes[exam as ExamKey].findMany({
      where: { tid },
      orderBy: { id: "desc" }
    });

    if (examData[0]) {
      delete examData[0].id;
      delete examData[0].tid;
    }

    res.json({
      tasting_uuid: tid,
      [`${exam.replace("-", "_")}_exam`]: examData[0] ?? {}
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/:tid", async (req: AuthRequest, res: Response) => {
  const { tid } = req.params;
  const uid = req.user.uid;

  const tasting = await validateTastingOwnership(tid, uid, res);
  if (!tasting) return;

  const {
    visual_exam,
    olfactory_exam,
    taste_olfactory_exam,
    final_considerations
  } = req.body;

  try {
    const results = await prisma.$transaction([
      visual_exam
        ? examTypes.visual.create({
            data: { tastings: { connect: { tid } }, ...visual_exam }
          })
        : Promise.resolve(null),
      olfactory_exam
        ? examTypes.olfactory.create({
            data: { tastings: { connect: { tid } }, ...olfactory_exam }
          })
        : Promise.resolve(null),
      taste_olfactory_exam
        ? examTypes.taste.create({
            data: { tastings: { connect: { tid } }, ...taste_olfactory_exam }
          })
        : Promise.resolve(null),
      final_considerations
        ? examTypes.final.create({
            data: { tastings: { connect: { tid } }, ...final_considerations }
          })
        : Promise.resolve(null)
    ]);

    res.status(201).json({
      tasting_uuid: tid,
      exams: {
        visual_exam: omitIdTid(results[0]),
        olfactory_exam: omitIdTid(results[1]),
        taste_olfactory_exam: omitIdTid(results[2]),
        final_considerations: omitIdTid(results[3])
      }
    });
  } catch (err: any) {
    if (err.code === "P2014" || err instanceof prisma.PrismaClientKnownRequestError) {
      return res.status(409).json({ error: `Tasting ${tid} has already been examined` });
    }
    console.error(err);
    res.status(500).json({ error: "Error creating exams" });
  }
});

router.post("/:tid/:exam", async (req: AuthRequest, res: Response) => {
  const { tid, exam } = req.params;
  const uid = req.user.uid;

  if (!Object.keys(examTypes).includes(exam)) {
    return res.status(400).json({ error: `Invalid exam type '${exam}'` });
  }

  const tasting = await validateTastingOwnership(tid, uid, res);
  if (!tasting) return;

  try {
    const newExam = await examTypes[exam as ExamKey].create({
      data: {
        tastings: { connect: { tid } },
        ...req.body
      }
    });
    delete newExam.id;
    delete newExam.tid;
    res.status(201).json(newExam);
  } catch (err: any) {
    if (err.code === "P2014" || err instanceof prisma.PrismaClientKnownRequestError) {
      return res.status(409).json({ error: `Tasting ${tid} already has ${exam} exam` });
    }
    console.error(err);
    res.status(500).json({ error: `Error creating ${exam} exam` });
  }
});

export default router;
