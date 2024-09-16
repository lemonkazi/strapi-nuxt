'use strict';

/**
 * post controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::post.post', ({ strapi }) => ({
  async vote(ctx) {
    const { id } = ctx.params;
    const { userIdentifier } = ctx.request.body;

    const post = await strapi.entityService.findOne('api::post.post', id, {
      populate: ['lastVoters'],
    });

    if (!post) {
      return ctx.notFound('Post not found');
    }

    const now = new Date();
    const twentyFourHoursAgo = new Date(now - 24 * 60 * 60 * 1000);

    // Remove old votes and check for recent votes by this user
    const recentVotes = (post.lastVoters || []).filter(vote => {
      const voteDate = new Date(vote.date);
      return voteDate > twentyFourHoursAgo && vote.userIdentifier === userIdentifier;
    });

    if (recentVotes.length > 0) {
      return ctx.badRequest('You can only vote once every 24 hours');
    }

    // Update the post
    const updatedPost = await strapi.entityService.update('api::post.post', id, {
      data: {
        votes: (post.votes || 0) + 1,
        lastVoters: [
          ...(post.lastVoters || []).filter(vote => new Date(vote.date) > twentyFourHoursAgo),
          { userIdentifier, date: now }
        ]
      }
    });

    return updatedPost;
  }
}));
