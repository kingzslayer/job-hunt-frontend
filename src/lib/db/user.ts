import type { UserProfile } from '@/types/db';
import { supabase } from '@/utils/supabase/client';

export const UserRepo = {
  async saveProfile(profile: Partial<UserProfile> & { user_id: string }) {
    const { error } = await supabase.from('users').upsert(profile, { onConflict: 'user_id' });

    if (error) throw error;
  },
};
