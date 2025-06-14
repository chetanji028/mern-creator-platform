const express = require('express');
const ContentIdea = require('../models/ContentIdea');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/generate', authenticate, async (req, res) => {
  const { topic, niche } = req.body;
  console.log('Request received:', { topic, niche, userId: req.user?.id }); // Debug log
  try {
    // Mock response
    const mockResponse = {
      reelIdea: `Create a ${niche} reel showcasing ${topic} with a quick tip format.`,
      caption: `Unlock the secrets of ${topic} in this ${niche} reel! 🚀 #${niche}Tips`,
      hashtags: [`${niche}Inspo`, `${niche}Tips`, `${topic}Ideas`, `${niche}Creators`, `${niche}Vibes`],
      hook: `Want to master ${topic}? Watch this!`,
    };

    const contentIdea = new ContentIdea({
      userId: req.user.id,
      topic,
      niche,
      reelIdea: mockResponse.reelIdea,
      caption: mockResponse.caption,
      hashtags: mockResponse.hashtags,
      hook: mockResponse.hook,
    });
    await contentIdea.save();
    console.log('Content idea saved:', contentIdea); // Debug log

    res.json(mockResponse);
  } catch (error) {
    console.error('Error generating idea:', error); // Debug log
    res.status(500).json({ error: 'Failed to generate idea' });
  }
});

router.get('/content-bank', authenticate, async (req, res) => {
  try {
    const ideas = await ContentIdea.find({ userId: req.user.id });
    res.json(ideas);
  } catch (error) {
    console.error('Error fetching content bank:', error);
    res.status(500).json({ error: 'Failed to fetch content bank' });
  }
});

module.exports = router;