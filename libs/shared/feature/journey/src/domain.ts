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
    callback: () => void;
}