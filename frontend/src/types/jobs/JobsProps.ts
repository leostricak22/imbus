import Job from "@/src/interface/Job";

type JobsProps = {
    navigation: any;
    jobs: Job[];
    date: string;
    refreshing: boolean;
};

export default JobsProps;