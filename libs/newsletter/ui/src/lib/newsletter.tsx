'use client';
import { Box, Button, Card, Flex, Text, TextField, Separator } from '@radix-ui/themes';
import { Newsletter, NewsletterSubscription } from '@wrkspce/newsletter/domain'
import { useState } from 'react';

export const NewsletterForm = () => {
    const [newsletter, setNewsletter] = useState<NewsletterSubscription>();
    const [industry, setIndustry] = useState<string>('');
    const [source, setSource] = useState<string>('');
    const [subcategory, setSubcategory] = useState<string>('');
    const [error, setError] = useState<string>();
    const handleNewsletterSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const _newsletter: Newsletter = {
            industry: industry,
            source: source,
            subcategory: subcategory
        }
        const subscription = await fetch('http://localhost:3000/api/newsletter/subscriptions', {
            method: 'POST',
            body: JSON.stringify({ userId: '12345', newsletter: _newsletter }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await subscription.json();
        if (data.error) {
            setError(data.error);
            return;
        }
        setNewsletter(data);
    }
    return (
        <Flex mt="8" direction={'column'} align={'center'} gap={'2'} width="100%">
            <Card className='w-full'>
                {
                    newsletter ? (
                        <div>
                            <Text as='div' size="5" className='mt-2'>Subscription Created!</Text>
                            <Separator size="4" className='mt-4' />
                            <p className="my-4">Industry: {newsletter.newsletter.industry}</p>
                            <p className="my-4">Source: {newsletter.newsletter.source}</p>
                            <p className="my-4">Subcategory: {newsletter.newsletter.subcategory}</p>
                        </div>
                    ) : (
                        <div>
                            <Text as='div' size="5" className='mt-2'>Subscribe to our newsletter</Text>
                            <Separator size="4" className='mt-4' />
                            <form onSubmit={handleNewsletterSubmit}>
                                <Box mb="4" mt="4">
                                    <label>
                                        <Text as="div" size="2" weight="medium" ml="1" mb="2">
                                            Industry
                                        </Text>
                                        <TextField.Root
                                            variant="classic"
                                            size="2"
                                            name="industry"
                                            onChange={(e) => setIndustry(e.target.value)}
                                        />
                                    </label>
                                </Box>
                                <Box mb="4" mt="4">
                                    <label>
                                        <Text as="div" size="2" weight="medium" ml="1" mb="2">
                                            Source
                                        </Text>
                                        <TextField.Root
                                            variant="classic"
                                            size="2"
                                            name="source"
                                            onChange={(e) => setSource(e.target.value)}
                                        />
                                    </label>
                                </Box>
                                <Box mb="4" mt="4">
                                    <label>
                                        <Text as="div" size="2" weight="medium" ml="1" mb="2">
                                            Subcategory
                                        </Text>
                                        <TextField.Root
                                            variant="classic"
                                            size="2"
                                            name="subcategory"
                                            onChange={(e) => setSubcategory(e.target.value)}
                                        />
                                    </label>
                                </Box>
                                <Flex mt="6" justify="end" gap="3">
                                    <Button disabled={!source || !industry || !subcategory} color='sky' variant="soft" type='submit'>Submit</Button>
                                </Flex>
                            </form>

                            {error && <p className="my-4">{error}</p>}
                        </div>
                    )
                }
            </Card>

        </Flex>
    )
}