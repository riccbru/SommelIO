import { Router } from "express";
import { PrismaClient } from "../generated/prisma/index.js";

const router = Router();
const prisma = new PrismaClient();

// GET /api/v1/colleagues
// Get all accepted colleagues for the current user
router.get("/", async (req, res) => {
  try {
    const uid = req.user.uid;
    
    const colleagues = await prisma.colleagues.findMany({
      where: {
        OR: [
          { requester_id: uid },
          { addressee_id: uid }
        ],
        status: 'accepted'
      },
      include: {
        requester: {
          select: {
            uid: true,
            username: true,
            full_name: true,
            premium: true
          }
        },
        addressee: {
          select: {
            uid: true,
            username: true,
            full_name: true,
            premium: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Transform the data to return only the colleague (not the current user)
    const colleaguesList = colleagues.map(relationship => {
      const colleague = relationship.requester_id === uid 
        ? relationship.addressee_id
        : relationship.requester_id;
      
      return {
        rid: relationship.rid,
        colleague: {
          uid: colleague.uid,
          username: colleague.username,
          full_name: colleague.full_name,
          premium: colleague.premium
        },
        colleagues_since: relationship.created_at,
        status: relationship.status
      };
    });
    
    res.json(colleaguesList);
  } catch (error) {
    console.error('Error fetching colleagues:', error);
    res.status(500).json({ error: 'Failed to fetch colleagues' });
  }
});

// GET /api/v1/colleagues/requests
// Get pending colleague requests
router.get("/requests", async (req, res) => {
  try {
    const uid = req.user.uid;
    
    // Get incoming requests (requests sent TO current user)
    const incomingRequests = await prisma.colleagues.findMany({
      where: {
        addressee_id: uid,
        status: 'pending'
      },
      include: {
        requester: {
          select: {
            uid: true,
            username: true,
            full_name: true,
            premium: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });

    // Get outgoing requests (requests sent BY current user)
    const outgoingRequests = await prisma.colleagues.findMany({
      where: {
        requester_id: uid,
        status: 'pending'
      },
      include: {
        addressee: {
          select: {
            uid: true,
            username: true,
            full_name: true,
            premium: true
          }
        }
      },
      orderBy: {
        created_at: 'desc'
      }
    });
    
    res.json({
      incoming: incomingRequests.map(req => ({
        rid: req.rid,
        user: req.requester,
        created_at: req.created_at
      })),
      outgoing: outgoingRequests.map(req => ({
        rid: req.rid,
        user: req.addressee,
        created_at: req.created_at
      }))
    });
  } catch (error) {
    console.error('Error fetching requests:', error);
    res.status(500).json({ error: 'Failed to fetch requests' });
  }
});

// POST /api/v1/colleagues/request
// Send colleague request
router.post("/request", async (req, res) => {
  try {
    const requesterId = req.user.uid;
    const { addresseeId } = req.body;
    
    if (!addresseeId) {
      return res.status(400).json({ error: 'Addressee ID is required' });
    }
    
    if (requesterId === addresseeId) {
      return res.status(400).json({ error: 'Cannot send request to yourself' });
    }
    
    // Check if addressee exists
    const addresseeExists = await prisma.users.findUnique({
      where: { uid: addresseeId }
    });
    
    if (!addresseeExists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if relationship already exists
    const existingRelationship = await prisma.colleagues.findFirst({
      where: {
        OR: [
          { requester_id: requesterId, addressee_id: addresseeId },
          { requester_id: addresseeId, addressee_id: requesterId }
        ]
      }
    });
    
    if (existingRelationship) {
      return res.status(400).json({ 
        error: `Relationship already exists with status: ${existingRelationship.status}` 
      });
    }
    
    // Create new colleague request
    const newRequest = await prisma.colleagues.create({
      data: {
        requester_id: requesterId,
        addressee_id: addresseeId,
        status: 'pending'
      },
      include: {
        addressee: {
          select: {
            uid: true,
            username: true,
            full_name: true
          }
        }
      }
    });
    
    res.status(201).json({
      message: 'Colleague request sent successfully',
      request: {
        rid: newRequest.rid,
        addressee: newRequest.addressee,
        status: newRequest.status,
        created_at: newRequest.created_at
      }
    });
  } catch (error) {
    console.error('Error sending request:', error);
    res.status(500).json({ error: 'Failed to send colleague request' });
  }
});

// PUT /api/v1/colleagues/accept/:rid
// Accept colleague request
router.put("/accept/:rid", async (req, res) => {
  try {
    const uid = req.user.uid;
    const { rid } = req.params;
    
    // Find the request and verify the current user is the addressee
    const request = await prisma.colleagues.findUnique({
      where: { rid: rid }
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    if (request.addressee_id !== uid) {
      return res.status(403).json({ error: 'Not authorized to accept this request' });
    }
    
    if (request.status !== 'pending') {
      return res.status(400).json({ error: `Request is already ${request.status}` });
    }
    
    // Accept the request
    const updatedRequest = await prisma.colleagues.update({
      where: { rid: rid },
      data: {
        status: 'accepted',
        updated_at: new Date()
      },
      include: {
        requester: {
          select: {
            uid: true,
            username: true,
            full_name: true
          }
        }
      }
    });
    
    res.json({
      message: 'Colleague request accepted',
      relationship: {
        rid: updatedRequest.rid,
        requester: updatedRequest.requester,
        status: updatedRequest.status,
        updated_at: updatedRequest.updated_at
      }
    });
  } catch (error) {
    console.error('Error accepting request:', error);
    res.status(500).json({ error: 'Failed to accept colleague request' });
  }
});

// PUT /api/v1/colleagues/decline/:rid
// Decline colleague request
router.put("/decline/:rid", async (req, res) => {
  try {
    const uid = req.user.uid;
    const { rid } = req.params;
    
    // Find the request and verify the current user is the addressee
    const request = await prisma.colleagues.findUnique({
      where: { rid: rid }
    });
    
    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }
    
    if (request.addressee_id !== uid) {
      return res.status(403).json({ error: 'Not authorized to decline this request' });
    }
    
    if (request.status !== 'pending') {
      return res.status(400).json({ error: `Request is already ${request.status}` });
    }
    
    // Decline the request
    const updatedRequest = await prisma.colleagues.update({
      where: { rid: rid },
      data: {
        status: 'declined',
        updated_at: new Date()
      }
    });
    
    res.json({
      message: 'Colleague request declined',
      relationship: {
        rid: updatedRequest.rid,
        status: updatedRequest.status,
        updated_at: updatedRequest.updated_at
      }
    });
  } catch (error) {
    console.error('Error declining request:', error);
    res.status(500).json({ error: 'Failed to decline colleague request' });
  }
});

// PUT /api/v1/colleagues/block/:uid
// Block a user (using their UID)
router.put("/block/:uid", async (req, res) => {
  try {
    const blockerId = req.user.uid;
    const { uid: blockedId } = req.params;
    
    if (blockerId === blockedId) {
      return res.status(400).json({ error: 'Cannot block yourself' });
    }
    
    // Check if user exists
    const userExists = await prisma.users.findUnique({
      where: { uid: blockedId }
    });
    
    if (!userExists) {
      return res.status(404).json({ error: 'User not found' });
    }
    
    // Check if relationship exists
    const existingRelationship = await prisma.colleagues.findFirst({
      where: {
        OR: [
          { requester_id: blockerId, addressee_id: blockedId },
          { requester_id: blockedId, addressee_id: blockerId }
        ]
      }
    });
    
    if (existingRelationship) {
      // Update existing relationship
      const blocked = await prisma.colleagues.update({
        where: { rid: existingRelationship.rid },
        data: {
          requester_id: blockerId, // The blocker becomes the requester
          addressee_id: blockedId,  // The blocked becomes the addressee
          status: 'blocked',
          updated_at: new Date()
        }
      });
      
      res.json({
        message: 'User blocked successfully',
        relationship: {
          rid: blocked.rid,
          status: blocked.status,
          updated_at: blocked.updated_at
        }
      });
    } else {
      // Create new blocking relationship
      const blocked = await prisma.colleagues.create({
        data: {
          requester_id: blockerId,
          addressee_id: blockedId,
          status: 'blocked'
        }
      });
      
      res.json({
        message: 'User blocked successfully',
        relationship: {
          rid: blocked.rid,
          status: blocked.status,
          created_at: blocked.created_at
        }
      });
    }
  } catch (error) {
    console.error('Error blocking user:', error);
    res.status(500).json({ error: 'Failed to block user' });
  }
});

// PUT /api/v1/colleagues/unblock/:rid
// Unblock a user
router.put("/unblock/:rid", async (req, res) => {
  try {
    const uid = req.user.uid;
    const { rid } = req.params;
    
    // Find the blocking relationship
    const relationship = await prisma.colleagues.findUnique({
      where: { rid: rid }
    });
    
    if (!relationship) {
      return res.status(404).json({ error: 'Relationship not found' });
    }
    
    if (relationship.requester_id !== uid) {
      return res.status(403).json({ error: 'Not authorized to unblock this user' });
    }
    
    if (relationship.status !== 'blocked') {
      return res.status(400).json({ error: 'User is not blocked' });
    }
    
    // Remove the blocking relationship
    await prisma.colleagues.delete({
      where: { rid: rid }
    });
    
    res.json({
      message: 'User unblocked successfully'
    });
  } catch (error) {
    console.error('Error unblocking user:', error);
    res.status(500).json({ error: 'Failed to unblock user' });
  }
});

// DELETE /api/v1/colleagues/:rid
// Remove colleague relationship
router.delete("/:rid", async (req, res) => {
  try {
    const uid = req.user.uid;
    const { rid } = req.params;
    
    // Find the relationship and verify the current user is involved
    const relationship = await prisma.colleagues.findUnique({
      where: { rid: rid }
    });
    
    if (!relationship) {
      return res.status(404).json({ error: 'Relationship not found' });
    }
    
    if (relationship.requester_id !== uid && relationship.addressee_id !== uid) {
      return res.status(403).json({ error: 'Not authorized to remove this relationship' });
    }
    
    // Delete the relationship
    await prisma.colleagues.delete({
      where: { rid: rid }
    });
    
    res.json({
      message: 'Colleague relationship removed successfully'
    });
  } catch (error) {
    console.error('Error removing relationship:', error);
    res.status(500).json({ error: 'Failed to remove colleague relationship' });
  }
});

// GET /api/v1/colleagues/search?query=username
// Search for users to add as colleagues
router.get("/search", async (req, res) => {
  try {
    const uid = req.user.uid;
    const { query } = req.query;
    
    if (!query || query.length < 2) {
      return res.status(400).json({ error: 'Search query must be at least 2 characters' });
    }
    
    // Get current colleague relationships to exclude them
    const existingRelationships = await prisma.colleagues.findMany({
      where: {
        OR: [
          { requester_id: uid },
          { addressee_id: uid }
        ]
      },
      select: {
        requester_id: true,
        addressee_id: true
      }
    });
    
    const excludeIds = [uid]; // Exclude self
    existingRelationships.forEach(rel => {
      if (rel.requester_id !== uid) excludeIds.push(rel.requester_id);
      if (rel.addressee_id !== uid) excludeIds.push(rel.addressee_id);
    });
    
    // Search for users
    const users = await prisma.users.findMany({
      where: {
        AND: [
          {
            uid: {
              notIn: excludeIds
            }
          },
          {
            OR: [
              {
                username: {
                  contains: query,
                  mode: 'insensitive'
                }
              },
              {
                full_name: {
                  contains: query,
                  mode: 'insensitive'
                }
              }
            ]
          }
        ]
      },
      select: {
        uid: true,
        username: true,
        full_name: true,
        premium: true
      },
      take: 20 // Limit results
    });
    
    res.json(users);
  } catch (error) {
    console.error('Error searching users:', error);
    res.status(500).json({ error: 'Failed to search users' });
  }
});

// GET /api/v1/colleagues/blocked
// Get all blocked users
router.get("/blocked", async (req, res) => {
  try {
    const uid = req.user.uid;
    
    const blockedUsers = await prisma.colleagues.findMany({
      where: {
        requester_id: uid,
        status: 'blocked'
      },
      include: {
        addressee: {
          select: {
            uid: true,
            username: true,
            full_name: true
          }
        }
      },
      orderBy: {
        updated_at: 'desc'
      }
    });
    
    res.json({
      blocked: blockedUsers.map(relationship => ({
        rid: relationship.rid,
        user: relationship.addressee,
        blocked_at: relationship.updated_at
      }))
    });
  } catch (error) {
    console.error('Error fetching blocked users:', error);
    res.status(500).json({ error: 'Failed to fetch blocked users' });
  }
});

export default router;