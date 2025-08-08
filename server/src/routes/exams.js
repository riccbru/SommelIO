import { Router } from "express";
import { formatOlfactoryExam } from "../utils/tastings.js";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

const examTypes = {
  "visual": prisma.visual_exams,
  "olfactory": prisma.olfactory_exams,
  "taste": prisma.taste_olfactory_exams,
  "final": prisma.final_considerations
};

function omitIdTid(exam) {
  if (!exam) return null;
  const { id, tid, ...rest } = exam;
  return rest;
}

async function validateTastingOwnership(tid, uid, res) {
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

router.get('/', (req, res) => {
  res.status(400).json({ error: `URL parameter 'tasting_uuid' is ${req.params.tid}` });
});

router.get('/:tid', async (req, res) => {
  const { tid } = req.params;
  const uid = req.user.uid;

  try {
    const tasting = await validateTastingOwnership(tid, uid, res);
    if (!tasting) return;

    const [visualExam, olfactoryExam, tasteOlfactoryExam, finalConsiderations] = await Promise.all([
      examTypes["visual"].findMany({ where: { tid }, orderBy: { id: 'desc' } }),
      examTypes["olfactory"].findMany({ where: { tid }, orderBy: { id: 'desc' } }),
      examTypes["taste"].findMany({ where: { tid }, orderBy: { id: 'desc' } }),
      examTypes["final"].findMany({ where: { tid }, orderBy: { id: 'desc' } })
    ]);

    delete visualExam[0]?.id;
    delete visualExam[0]?.tid;
    delete olfactoryExam[0]?.id;
    delete olfactoryExam[0]?.tid;
    delete tasteOlfactoryExam[0]?.id;
    delete tasteOlfactoryExam[0]?.tid;
    delete finalConsiderations[0]?.id;
    delete finalConsiderations[0]?.tid;  

    res.json({
      tasting_uuid: tid,
      exams: {
        visual_exam: visualExam[0] ?? {},
        olfactory_exam: olfactoryExam[0] ? formatOlfactoryExam(olfactoryExam[0]) : {},
        taste_olfactory_exam: tasteOlfactoryExam[0] ?? {},
        final_considerations: finalConsiderations[0] ?? {}
      }
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.get('/:tid/:exam', async (req, res) => {
  const { tid, exam } = req.params;
  const uid = req.user.uid;

  if (!examTypes[exam]) {
    return res.status(400).json({ error: `Invalid exam type '${exam}'` });
  }

  try {
    const tasting = await validateTastingOwnership(tid, uid, res);
    if (!tasting) return;

    const examData = await examTypes[exam].findMany({
      where: { tid },
      orderBy: { id: 'desc' },
    });

    
    delete examData[0]?.id;
    delete examData[0]?.tid;

    let formattedData = examData[0];

    if (exam === 'olfactory') {
      formattedData = formatOlfactoryExam(formattedData);
    }

    res.json({
      tasting_uuid: tid,
      [`${exam.replace('-', '_')}_exam`]: formattedData ?? {},
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

router.post('/:tid',
  async (req, res) => {
    const { tid } = req.params;
    const uid = req.user.uid;

    const tasting = await validateTastingOwnership(tid, uid, res);
    if (!tasting) return;

    const {
      visual_exam,
      olfactory_exam,
      taste_olfactory_exam,
      final_considerations,
    } = req.body;

    try {
      const results = await prisma.$transaction([
        visual_exam ? examTypes['visual'].create({ data: { tastings: {connect: {tid: tid}}, ...visual_exam } }) : Promise.resolve(null),
        olfactory_exam ? examTypes['olfactory'].create({ data: { tastings: {connect: {tid: tid}}, ...olfactory_exam } }) : Promise.resolve(null),
        taste_olfactory_exam ? examTypes['taste'].create({ data: { tastings: {connect: {tid: tid}}, ...taste_olfactory_exam } }) : Promise.resolve(null),
        final_considerations ? examTypes['final'].create({ data: { tastings: {connect: {tid: tid}}, ...final_considerations } }) : Promise.resolve(null),
      ]);

      res.status(201).json({
        tasting_uuid: tid,
        exams: {
          visual_exam: omitIdTid(results[0]),
          olfactory_exam: formatOlfactoryExam(omitIdTid(results[1])),
          taste_olfactory_exam: omitIdTid(results[2]),
          final_considerations: omitIdTid(results[3]),
        }
      });
    } catch (err) {
      if (err.code === 'P2014') {
        return res.status(409).json({ error: `Tasting ${tid} has already been examined` });
      }
      console.error(err);
      res.status(500).json({ error: 'Error creating exams' });
    }
  }
);

router.post('/:tid/:exam',
  async (req, res) => {
    const { tid, exam } = req.params;
    const uid = req.user.uid;

    if (!examTypes[exam]) {
      return res.status(400).json({ error: `Invalid exam type '${exam}'` });
    }

    const tasting = await validateTastingOwnership(tid, uid, res);
    if (!tasting) return;

    try {
      const newExam = await examTypes[exam].create({
        data: {
          tastings: { connect: { tid: tid } },
          ...req.body },
      });

      
      delete newExam?.id;
      delete newExam?.tid;

      
      let formattedData = newExam;
      if (exam === 'olfactory' && newExam) {
        formattedData = formatOlfactoryExam(newExam);
      }
      res.status(201).json(formattedData);
    } catch (err) {
      if (err.code === 'P2014') {
        return res.status(409).json({ error: `Tasting ${tid} already has ${exam} exam` });
      }
      console.error(err);
      res.status(500).json({ error: `Error creating ${exam} exam` });
    }
  }
);

export default router;