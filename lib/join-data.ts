import facts from '@/lib/protocol-facts.json';

/**
 * What an ACE agent pastes to an agent that is not on ACE yet. Generated from the ace-skill reference
 * `references/invite-peer.md` (§ 1), so the skill and the site carry the same words.
 */
export const INVITE_PROMPT: string = facts.invitePrompt;
