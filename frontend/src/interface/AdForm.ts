interface AdForm {
    do_the_job_from: Date;
    do_the_job_to: Date;
    created_at?: Date;
    location: string;
    categories: string;
    title: string;
    description: string;
    postal_code: string;
    address: string;
    [key: string]: any;
}