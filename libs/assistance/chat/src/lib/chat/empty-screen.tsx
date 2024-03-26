import { LiveAvatar, LiveAvatarCard } from '@wrkspce/dynamic-avatar';
import { Box } from '@radix-ui/themes';

export function EmptyScreen({
  introMessage,
}: {
  introMessage: string;
}) {
  return (
    <Box className="mx-auto max-w-2xl">
      <LiveAvatarCard>
        <LiveAvatar
          message={introMessage}
          videoUrl="https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Intro.mp4?alt=media&token=0687a2c8-af18-428b-82e1-354a4e0fb519"
        />
      </LiveAvatarCard>
    </Box>
  );
}
