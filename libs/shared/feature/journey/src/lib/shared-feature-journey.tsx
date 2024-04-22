'use client'
import React, { useEffect } from 'react';
import { Box, Heading, Text, Button, Avatar, Flex, Card, DataList, Separator, Code, Inset, Badge } from '@radix-ui/themes';
import { getInitials } from '@wrkspce/shared/util';
export interface Journey {
  subject: JourneySubject;
  steps: JourneyStep[];
}

export interface JourneySubject {
  name: string;
  title: string;
  avatarUrl?: string;
  about: string;
}

export interface JourneyStep {
  title: string;
  story: string;
  imageUrl?: string;
  videoUrl?: string;
  action?: JourneyAction;
}

export interface JourneyAction {
  label?: string;
  code?: string;
  callback?: () => void;
}

/* eslint-disable-next-line */
export interface SharedFeatureJourneyProps {
  journies: Journey[];
}

export function SharedFeatureJourney({ journies }: SharedFeatureJourneyProps) {
  const [currentJourney, setCurrentJourney] = React.useState(journies[0]);

  const handleJourneySelection = (journey: Journey) => {
    setCurrentJourney(journey);
  };

  useEffect(() => {
    setCurrentJourney(journies[0]);
  }, [journies]);

  return (
    <Card variant='ghost' className="relative z-30 w-full mt-4">
      <Flex gap="4" px="4" direction={'column'}>
        {/* <Heading size="5">Select a journey to learn how this works</Heading> */}
        {/* <Flex gap="4" direction={'row'}>
          {journies.map((journey, index) => (
            <Box key={index}>
              <Card size="2" variant="surface" asChild onClick={() => handleJourneySelection(journey)} className={`border-2 ${journies[index] === currentJourney && "border-sky-11 border-solid"}`}>
                <Flex direction={'column'} align="center" justify="center">
                  <Box>
                    <Avatar size="4" radius="full" fallback={getInitials(journey.subject.name)} color="indigo" />
                  </Box>
                  <Box>
                    <Text as="div" weight="bold">
                      {journey.subject.name}
                    </Text>
                    <Text as="div" color="gray">
                      {journey.subject.title}
                    </Text>
                  </Box>
                </Flex>
              </Card>
            </Box>
          ))}
        </Flex> */}
        {
          currentJourney && <JourneySteps journey={currentJourney} />
        }
      </Flex>
    </Card>

  );
}

const JourneySteps = ({ journey }: { journey: Journey }) => {
  const [currentStep, setCurrentStep] = React.useState(journey.steps[0]);
  const handleStepSelection = (index: number) => {
    setCurrentStep(journey.steps[index]);
  }
  useEffect(() => {
    setCurrentStep(journey.steps[0]);
  }, [journey]);
  return (

    <Flex gapX="4" maxWidth="100%" direction={'row'}>

      <Flex direction={'column'} flexShrink="0" >
        {/* <Heading size="2">Explore the journey of {journey.subject.name}</Heading> */}
        <DataList.Root orientation="horizontal" className="justify-center items-center">
          {
            journey.steps.map((step, index) => (
              <DataList.Item key={index} onClick={() => handleStepSelection(index)} className={`${journey.steps[index] === currentStep && 'text-sky-9'}`}>
                <DataList.Value>
                  <Button variant={journey.steps[index] === currentStep ? 'classic' : 'ghost'} radius='full' className="min-w-8 min-h-8 my-1">
                    {index + 1}
                  </Button>
                  {/* <Text truncate>
                        {step.title}
                      </Text> */}
                </DataList.Value>
              </DataList.Item>
            ))
          }
        </DataList.Root>
      </Flex>

      <Flex direction={'column'} maxWidth="100%">
        <Heading size="6" mt="2">{currentStep.title}</Heading>
        <Separator size="4" my={`4`} />
        <Text>{currentStep.story}</Text>
        {
          currentStep.imageUrl && <img src={currentStep.imageUrl} alt={currentStep.title} />
        }
        {
          currentStep.videoUrl &&
          <video src={currentStep.videoUrl} controls />
        }
        {
          currentStep.action && (
            <Card asChild my="4" variant="classic" className="bg-blackA-12">
              <pre className="max-w-full box-content text-wrap">
                {currentStep.action.label && <Text as="div" mb="2" weight="bold"><Badge>{currentStep.action.label}</Badge></Text>}
                <Text as="div" className='text-fira-code'>{currentStep.action.code}</Text>
              </pre>
            </Card>
          )
        }
      </Flex>
    </Flex>
  )
}

export default SharedFeatureJourney;
