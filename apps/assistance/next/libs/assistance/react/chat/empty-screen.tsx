import { LiveAvatar, LiveAvatarCard } from '../../../persona/lib/LiveAvatar';
import { Button } from '../ui/button';
import { IconArrowRight } from '../ui/icons';
import { Box, Card, Text } from '@radix-ui/themes';

const exampleMessages = [
  {
    heading: 'A new workspace scope',
    message: 'I want to configure a new scope for "ai" within my workspace.',
  },
  {
    heading: "A new scoped library",
    message: 'I want to build a new library named "ui" within the "ai" scope.',
  },
  {
    heading: "A new library component",
    message: 'I want to build a new react component named "Form" within the ai/ui library.',
  },
];

export function EmptyScreen({
  submitMessage,
  introMessage,
}: {
  submitMessage: (message: string) => void;
  introMessage: string;
}) {
  return (
    <>
      <Box className="mx-auto max-w-2xl">
        <LiveAvatarCard>
          <LiveAvatar onReady={(el => el.play())} message={introMessage} videoUrl="https://firebasestorage.googleapis.com/v0/b/make-with-it-firebase.appspot.com/o/Clone_Intro.mp4?alt=media&token=0687a2c8-af18-428b-82e1-354a4e0fb519" />
        </LiveAvatarCard>
      </Box>


    </>
    // <Card size="3" className="mx-auto max-w-2xl" variant="surface">
    //   <Text as="div" size="4" mb={"4"}>AI Workspace Configuration Generator</Text>
    //   <Text as="p" mb={"4"} className="leading-normal text-muted-foreground">
    //     This is a demo of an AI assistant that can interpret feature descriptions, identify requirements, and generate the appropriate NX workspace configurations.
    //   </Text>
    //   {/* <Grid columns={{ initial: '1', md: '3' }} gap="3" width="100%">
    //     <Box height="min-content">
    //       <MixIcon className="h-16 w-full" />
    //     </Box>
    //     <Box height="min-content">
    //       <MixIcon className="h-24 w-full" />
    //     </Box>
    //     <Box height="min-content">
    //       <MixIcon className="h-24 w-full" />
    //     </Box>
    //   </Grid>

    //   <p className="mb-2 leading-normal text-muted-foreground">
    //     It uses{' '}
    //     <ExternalLink href="https://vercel.com/blog/ai-sdk-3-generative-ui">
    //       React Server Components
    //     </ExternalLink>{' '}
    //     to combine text with UI generated as output of the LLM. The UI state
    //     is synced through the SDK so the model is aware of your interactions
    //     as they happen.
    //   </p> */}
    //   <p className="leading-normal text-muted-foreground">Try an example:</p>
    //   <div className="mt-4 flex flex-col items-start space-y-2 mb-4">
    //     {exampleMessages.map((message, index) => (
    //       <Button
    //         key={index}
    //         variant="link"
    //         className="h-auto p-0 text-base"
    //         onClick={async () => {
    //           submitMessage(message.message);
    //         }}
    //       >
    //         <IconArrowRight className="mr-2 text-muted-foreground" />
    //         {message.heading}
    //       </Button>
    //     ))}
    //   </div>
    // </Card>

  );
}
