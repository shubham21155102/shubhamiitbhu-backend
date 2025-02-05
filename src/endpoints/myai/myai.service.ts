import { Injectable, Query } from '@nestjs/common';
import { exec } from 'child_process';
import { CreateMyAIDTO, PersonalBotDTO } from './dto/myai';
import { configService } from 'src/config/config';
import { Response } from 'express';

@Injectable()
export class MyaiService {
  async getGithubRepos() {
    return new Promise((resolve, reject) => {
      const command = 'gh repo list';
      exec(command, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
  async commitToGitHub(createMyAiDto: CreateMyAIDTO) {
    return new Promise((resolve, reject) => {
      const commands = `git add . && git commit -m"${createMyAiDto.commitDetails}" && git push`;
      exec(commands, (error, stdout, stderr) => {
        if (error) {
          reject(stderr);
        }
        resolve(stdout);
      });
    });
  }
  async deepSeek(query: string, res: Response) {
    const apiKeys = configService.getGroqApiKeys();

    for (const apiKey of apiKeys) {
      try {
        const requestBody = {
          model: 'deepseek-r1-distill-llama-70b',
          messages: [{ role: 'user', content: query }],
        };

        console.log('Sending request with body:', JSON.stringify(requestBody)); // Log the request body

        const response = await fetch(
          `https://api.groq.com/openai/v1/chat/completions`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify(requestBody.messages[0].content),
          },
        );

        if (!response.ok) {
          const errorBody = await response.text(); // Get the response body for error details
          console.error(
            `HTTP error! status: ${response.status}, body: ${errorBody}`,
          );
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder('utf-8');

        while (true) {
          const { done, value } = await reader.read();
          if (done) break;

          const chunk = decoder.decode(value, { stream: true });
          res.write(`data: ${chunk}\n\n`); // Send the chunk to the client
        }

        res.end(); // End the response when done
        return;
      } catch (error) {
        console.error(`Failed with API key ${apiKey.slice(0, 8)}...: ${error}`);
        // Continue to next key on error
      }
    }

    res.write(`data: All API keys failed\n\n`);
    res.end();
  }
  async myPersonalBot(x: PersonalBotDTO) {
    // console.log(query)
    const { query } = x;
    const apiKeys = configService.getGroqApiKeys();
    const experienceData = [
      {
        id: 1,
        company: 'DivineTalk Astrology',
        position: 'Software Engineer',
        description:
          'Worked on various projects and contributed to software development.',
        startDate: 'Dec 2024',
        endDate: 'Present',
        skills: [
          'Amazon Web Services (AWS)',
          'Express.js',
          'Kibana',
          'Elasticsearch',
          'MySQL',
          'Elastic Stack (ELK)',
        ],
        image:
          'https://media.licdn.com/dms/image/v2/D4D0BAQEMi_iL1AX2OA/company-logo_100_100/company-logo_100_100/0/1705392209325/divinetalk_logo?e=1746662400&v=beta&t=9wEKzpYoks5yFn6Xz3KRtSxqTfwHndTU0dDB0iop9YQ',
      },
      {
        id: 2,
        company: 'FMC Weekend',
        position: 'Senior Advisor',
        description:
          'Oversaw technical operations and led event participation.',
        startDate: 'Jan 2024',
        endDate: 'Oct 2024',
        skills: ['Leadership', 'Event Management'],
        image:
          'https://media.licdn.com/dms/image/v2/D560BAQH86tUgFign6Q/img-crop_100/img-crop_100/0/1723556307899?e=1746662400&v=beta&t=utKewCX3wl_PKxOslwBAiBDXuKW3cVuwFhzh96QDQYg',
      },
      {
        id: 3,
        company: 'FMC Weekend',
        position: 'Tech Head',
        description:
          'Led technical operations, increasing event participation by 30%.',
        startDate: 'May 2023',
        endDate: 'Dec 2023',
        skills: ['Leadership', 'Technical Operations'],
        image:
          'https://media.licdn.com/dms/image/v2/D560BAQH86tUgFign6Q/img-crop_100/img-crop_100/0/1723556307899?e=1746662400&v=beta&t=utKewCX3wl_PKxOslwBAiBDXuKW3cVuwFhzh96QDQYg',
      },
      {
        id: 4,
        company: 'FMC Weekend',
        position: 'Technical Executive',
        description: 'Contributed to various technical projects.',
        startDate: 'Nov 2022',
        endDate: 'Jun 2023',
        skills: ['Node.js', 'Front-End Development', 'Back-End Development'],
        image:
          'https://media.licdn.com/dms/image/v2/D560BAQH86tUgFign6Q/img-crop_100/img-crop_100/0/1723556307899?e=1746662400&v=beta&t=utKewCX3wl_PKxOslwBAiBDXuKW3cVuwFhzh96QDQYg',
      },
      {
        id: 5,
        company: 'Jindal Steel & Power Ltd.',
        position: 'Technology Integration Intern',
        description:
          'Worked on multiple projects including volume calculations and automation.',
        startDate: 'May 2024',
        endDate: 'Jul 2024',
        skills: ['Python', 'JavaScript', 'Data Visualization', '3D Modeling'],
        image:
          'https://media.licdn.com/dms/image/v2/C4E0BAQEq60t16uDOWw/company-logo_100_100/company-logo_100_100/0/1630628425888/jindal_steel__power_ltd__logo?e=1746662400&v=beta&t=M55XVbTsiC_Wn85PjHABEROsP8aXxCJU3sYhYclEcFk',
      },
      {
        id: 6,
        company: 'Rejoy Health',
        position: 'Back End Developer Intern',
        description: 'Contributed to backend development.',
        startDate: 'May 2024',
        endDate: 'May 2024',
        skills: ['AWS Fargate', 'Amazon SQS', 'Celery'],
        image:
          'https://media.licdn.com/dms/image/v2/C560BAQHlwA6rRf8OrA/company-logo_100_100/company-logo_100_100/0/1660842587536/rejoyhealthusa_logo?e=1746662400&v=beta&t=WyASMsiRUwrhf8JysgZhG-uHJKP6MY1kOTOFieOX5EQ',
      },
      {
        id: 7,
        company: 'One Inc Cooperative',
        position: 'Software Engineer Intern',
        description: 'Worked on software engineering projects.',
        startDate: 'Apr 2024',
        endDate: 'May 2024',
        skills: ['AWS Fargate', 'Amazon SQS', 'Celery'],
        image:
          'https://media.licdn.com/dms/image/v2/C4E0BAQEOxz-UbEqY0g/company-logo_100_100/company-logo_100_100/0/1630638304030/citizensofone_logo?e=1746662400&v=beta&t=xkSA47SsSC-D5aOUnostW7TfHU0uu1Waic7wfU2hEBQ',
      },
      {
        id: 8,
        company: 'JS Tigers',
        position: 'Software Developer Intern',
        description: 'Worked on various software development projects.',
        startDate: 'Apr 2024',
        endDate: 'May 2024',
        skills: [
          'APIless Full Stack Website',
          'tRPC',
          'Material-UI',
          'Tailwind CSS',
          'React Native',
        ],
        image:
          'https://media.licdn.com/dms/image/v2/D560BAQFWw6cuyDYnbw/company-logo_100_100/company-logo_100_100/0/1711082676203/jstigers_logo?e=1746662400&v=beta&t=7766R82PmUJ5zVSNN-L2IcPGI-hbcJ6oppIJ8uNN10U',
      },
      {
        id: 9,
        company: 'Acencore',
        position: 'Full Stack Developer Intern',
        description: 'Led CI/CD implementation and backend development.',
        startDate: 'Mar 2024',
        endDate: 'Apr 2024',
        skills: ['Docker', 'GitHub Actions', 'NestJS', 'FastAPI'],
        image:
          'https://media.licdn.com/dms/image/v2/D4D0BAQE1ShqDr0dkLg/company-logo_100_100/company-logo_100_100/0/1710004323468/acencoreai_logo?e=1746662400&v=beta&t=Iv8xlNLpZFf_g2Y4kn9NiEZ2tRSsGHTMZcuj7Lv9WCQ',
      },
      {
        id: 10,
        company: 'Ostello AI',
        position: 'DevOps and Backend Engineer',
        description:
          'Contributed to backend development and DevOps initiatives.',
        startDate: 'Jan 2024',
        endDate: 'Feb 2024',
        skills: ['NestJS', 'PostgreSQL', 'Redis', 'Elastic Beanstalk'],
        image:
          'https://media.licdn.com/dms/image/v2/C4D0BAQEUOe5VKZ0Hhw/company-logo_100_100/company-logo_100_100/0/1659072964018/ostello_india_logo?e=1746662400&v=beta&t=-Asu_6cT8o6vbZy8gNvPAREv5ZeGJGCowuLRB-GqpYo',
      },
      {
        id: 11,
        company: 'Techies Gateway',
        position: 'Frontend Developer Intern',
        description: 'Worked on frontend development projects.',
        startDate: 'Dec 2023',
        endDate: 'Dec 2023',
        skills: ['Front-End Development'],
        image:
          'https://media.licdn.com/dms/image/v2/D560BAQGewu5KVZWVPg/company-logo_100_100/company-logo_100_100/0/1711037280811/techies_gateway_logo?e=1746662400&v=beta&t=XC7b2jzIbpW8CKcvkacAW1MoJOhqsnH4lKLp7as-w3s',
      },
      {
        id: 12,
        company: 'TryAndes',
        position: 'Software Engineer Intern',
        description: 'Contributed to frontend and backend development.',
        startDate: 'Jul 2023',
        endDate: 'Oct 2023',
        skills: ['Next.js', 'Flask', 'Typescript', 'MySQL'],
        image: 'https://picsum.photos/id/1125/200/200',
      },
      {
        id: 13,
        company: 'Club of Programmers, IIT BHU',
        position: 'Software Development Group Member',
        description: 'Worked on various software development projects.',
        startDate: 'Dec 2022',
        endDate: 'Jul 2023',
        skills: ['Node.js', 'Front-End Development', 'Back-End Development'],
        image:
          'https://media.licdn.com/dms/image/v2/C4E0BAQFWyeIkMecCww/company-logo_100_100/company-logo_100_100/0/1630654066846/cops_iitbhu_logo?e=1746662400&v=beta&t=-ku2G86sz3Ebj7n7iK-N6eKWPLHtFr9e9QW7PAK-6f0',
      },
      {
        id: 14,
        company: 'Science and Technology Council, IIT BHU',
        position: 'Technical Executive',
        description: 'Contributed to various technical projects.',
        startDate: 'Nov 2022',
        endDate: 'Mar 2023',
        skills: ['Node.js', 'Front-End Development', 'Back-End Development'],
        image:
          'https://media.licdn.com/dms/image/v2/D560BAQH_WyK-qBHGFA/company-logo_100_100/company-logo_100_100/0/1711644358016?e=1746662400&v=beta&t=Q2u-UmBWdF_BV4MtpKG1qd26XZtK-6YWzmPCaCq9NAA',
      },
      {
        id: 15,
        company: 'Filo',
        position: 'Doubt Expert',
        description: 'Provided assistance and support.',
        startDate: 'Feb 2022',
        endDate: 'May 2022',
        skills: ['Communication', 'Problem Solving'],
        image:
          'https://media.licdn.com/dms/image/v2/C4D0BAQFw5QXPmupPsQ/company-logo_100_100/company-logo_100_100/0/1667979005637/filoedtech_logo?e=1746662400&v=beta&t=SoYO0Dn0Uzih5CVHL5mMjue09UN2rsXDENIGnDCelCM',
      },
    ];

    const educationData = [
      {
        id: 1,
        institution:
          'Indian Institute of Technology (Banaras Hindu University), Varanasi',
        degree: 'Bachelor of Technology - BTech, Mining',
        startDate: '2021',
        endDate: '2025',
        grade: 'CGPA: 8.63',
        skills: [
          'Node.js',
          'User Interface Design',
          'Front-End Development',
          'Responsive Web Design',
          'Back-End Web Development',
        ],
        logo: 'https://media.licdn.com/dms/image/v2/C4D0BAQHyenVUtyQrLg/company-logo_100_100/company-logo_100_100/0/1631309569195?e=1746662400&v=beta&t=fgUDvyYmXlSDS3dhnfTkc17ZvfwaqcaV0H36qpINNEc',
      },
      {
        id: 2,
        institution: 'DAUDNAGAR COLLEGE DAUDNAGAR',
        degree: 'Intermediate, PCM',
        startDate: 'Apr 2018',
        endDate: 'Feb 2020',
        grade: 'District Rank (<10) State Rank (<20)',
        skills: [],
        logo: 'https://www.daudnagarcollege.ac.in/upload/images/16729045601624091965logo.png',
      },
      {
        id: 3,
        institution: 'Simultala Awasiya Vidyalaya',
        degree: 'Matriculation',
        startDate: 'Dec 2013',
        endDate: 'Feb 2018',
        grade: 'Overall Bihar Rank - 14',
        skills: [],
        logo: 'https://savbihar.ac.in/wp-content/uploads/2021/04/simultala_logo.jpg',
      },
    ];
    for (const apiKey of apiKeys) {
      try {
        const SYSTEM_PROMPT = `
        You are Shubham Kumar's personal assistant. Use these guidelines:
        1. Answer based on his experience (${JSON.stringify(experienceData)}) 
           and education (${JSON.stringify(educationData)})
        2. Keep responses concise (1-2 paragraphs max)
        3. Use friendly, professional tone
        4. For technical questions, highlight relevant skills from experience
        5. If unsure, ask for clarification
        
        Example:
        Q: What backend experience do I have?
        A: You have extensive backend experience with Node.js, AWS, and PostgreSQL across multiple roles including...
        `;

        const response = await fetch(
          'https://api.groq.com/openai/v1/chat/completions',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
              model: 'deepseek-r1-distill-llama-70b',
              messages: [
                {
                  role: 'system',
                  content: SYSTEM_PROMPT,
                },
                {
                  role: 'user',
                  content: query,
                },
              ],
              temperature: 0.7,
              max_tokens: 500,
            }),
          },
        );

        if (!response.ok) {
          const error = await response.text();
          console.error(
            `API request failed with key ${apiKey.slice(0, 8)}...: ${error}`,
          );
          continue;
        }

        const { choices } = await response.json();
        const answer = choices[0].message.content;
        function removeThinkTags(text) {
          return text.replace(/<think>[\s\S]*?<\/think>/g, '');
        }
        const cleanAnswer = removeThinkTags(answer);
        return {
          answer: cleanAnswer,
        };
      } catch (error) {
        console.error(`Error with API key ${apiKey.slice(0, 8)}...: ${error}`);
      }
    }

    throw new Error('All API keys failed to respond');
  }
}

// If you need to test, move this outside the class
// setTimeout(async () => {
//   const service = new MyaiService();
//   // Create a mock response object
//   const mockResponse = {
//     write: (data: string) => console.log('Response:', data),
//     end: () => console.log('Response ended'),
//   } as unknown as Response; // Cast to Response type

//   await service.deepSeek('What is heppening in the world?', mockResponse);
// }, 5000);

// setTimeout(async () => {
//   const service = new MyaiService();
//   const response = await service.myPersonalBot('How many girlfriends do you have?');
//   console.log(response);
// }, 5000);
