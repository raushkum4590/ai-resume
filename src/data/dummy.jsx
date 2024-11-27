const dummy = {
    firstName: 'James',
    lastName: 'Carter',
    jobTitle: 'Full Stack Developer',
    address: '525 N Tryon Street, NC 28117',
    phone: '1234567890',
    email: 'example@gmail.com',
    themeColor: '#ff6666',
    summary: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    experience: [
        {
            id: 1,
            title: 'Full Stack Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2021',
            endDate: '',
            currentlyWorking: true,
            workSummary: 'Designed, developed, and maintained full stack applications.',
        },
        {
            id: 2,
            title: 'Full Stack Developer',
            companyName: 'Amazon',
            city: 'New York',
            state: 'NY',
            startDate: 'Jan 2021',
            endDate: '',
            currentlyWorking: true,
            workSummary: 'Designed, developed, and maintained full stack applications.',
        },
        // Add more experience if needed
    ],
    education: [
        {
            id: 1,
            universityName: 'University of Technology',
            degree: 'Bachelor of Science',
            major: 'Computer Science',
            city: 'New York',
            state: 'NY',
            startDate: 'Sep 2015',
            endDate: 'May 2019',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        {
            id: 2,
            universityName: 'Tech Institute',
            degree: 'Full Stack Development Certification',
            city: 'San Francisco',
            state: 'CA',
            startDate: 'Jun 2020',
            endDate: 'Dec 2020',
            description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit',
        },
        // Add more education if needed
    ],
    skills: [
        { name: 'JavaScript', rating: 5 },
        { name: 'React', rating: 4 },
        { name: 'Node.js', rating: 4 },
        { name: 'Express', rating: 3 },
        { name: 'MongoDB', rating: 4 },
        { name: 'CSS', rating: 3 },
        { name: 'HTML', rating: 5 },
        { name: 'Git', rating: 3 },
        // Add more skills if needed
    ]
};

export default dummy;
