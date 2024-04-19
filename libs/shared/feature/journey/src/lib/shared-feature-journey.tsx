'use client'
import React, { useEffect } from 'react';
import { Box, Heading, Text, Button, Avatar, Flex, Card, DataList, Separator, Code } from '@radix-ui/themes';
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
  label: string;
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
        <Heading size="5">Select a journey to learn how this works</Heading>
        <Flex gap="4" direction={'row'}>
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
        </Flex>
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
    <Card>
      <Flex gapX="4" className='w-full' direction={'row'}>
        <Box className="min-w-60">
          <Flex gapY={`2`} direction={'column'}>
            {/* <Heading size="2">Explore the journey of {journey.subject.name}</Heading> */}
            <DataList.Root orientation="horizontal">
              {
                journey.steps.map((step, index) => (
                  <DataList.Item key={index} onClick={() => handleStepSelection(index)} className={`p-2 ${journey.steps[index] === currentStep && 'text-sky-9'}`}>
                    <DataList.Value>
                      {/* <Box minWidth={`20px`} maxWidth={`20px`}>
                        {index + 1}
                      </Box> */}
                      <Text truncate>
                        {step.title}
                      </Text>
                    </DataList.Value>
                  </DataList.Item>
                ))
              }
            </DataList.Root>
          </Flex>
        </Box>
        <Box className='w-full'>
          <Flex direction={'column'}>
            <Heading size="6">{currentStep.title}</Heading>
            <Separator size="4" my={`4`} />
            <Text>{currentStep.story}</Text>
            <Box>
              {
                currentStep.imageUrl && <img src={currentStep.imageUrl} alt={currentStep.title} />
              }
            </Box>
            <Box>
              {
                currentStep.videoUrl && <video src={currentStep.videoUrl} controls />
              }
            </Box>

            {
              currentStep.action && (
                <Box>
                  <Code>{currentStep.action.code}</Code>
                  {/* <Button onClick={currentStep.action.callback}>{currentStep.action.label}</Button> */}
                </Box>
              )
            }
          </Flex>
        </Box>
      </Flex>
    </Card>
  )
}

export default SharedFeatureJourney;
