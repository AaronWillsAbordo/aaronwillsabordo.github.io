export const data = [
    {
        id: 'nimbyx',
        company: 'Nimbyx Philippines Inc.',
        source: `${process.env.PUBLIC_URL}/img/logo-nimbyx.jpg`,
        roles: [{
                title: 'Software Engineer 1',
                date: 'Feb 2023 - Present',
                descriptions: [
                    `<strong>Designed</strong>, <strong>implemented</strong>, and <strong>automated</strong> various 
                    services and products, ensuring efficient development processes and streamlined deployments.`,
    
                    `Built <strong>automated workflows</strong> to simulate user actions, both UI-based (using front-end 
                    automation tools) and non-UI-based (background services), utilizing <strong>Python</strong>, <strong>.NET</strong>, 
                    and <strong>UiPath</strong> for seamless automation.`, 
                    
                    `Developed <strong>unit</strong> and <strong>end-to-end 
                    tests</strong> for web applications  using <strong>Cypress</strong>, improving test coverage and quality assurance.`,
    
                    `Contributed to the development of an <strong>internal web-based</strong> product, playing a key role in 
                    both <strong>front-end</strong> and <strong>back-end</strong> development.`, 
                    
                    `Collaborated closely with both internal teams and end-users to ensure the product met functional requirements 
                    and user needs.`, 
                    
                    `Additionally, took on a <strong>key role in gathering requirements</strong>, facilitating communication, and 
                    coordinating efforts across teams to ensure product development aligned with business objectives.`
                ],
                skills: [
                    'C#', '.NET Framework', 'JavaScript', 'React', 'Cypress', 'SQL', 'RESTful API', 'Git',
                    'Jira', 'Google Cloud IAM', 'Robotic Process Automation (RPA)', 'UiPath', 'Azure Service Bus',
                    'Agile Methodologies', 'Software Development'
                ],
            },
            {
                title: 'Machine Learning Engineer 1',
                date: 'Jul 2023 - Jun 2024',
                descriptions: [
                    `Developed an AI-powered solution to automate and streamline <strong>3D mesh manipulation</strong>, reducing 
                    manual labor and improving workflow efficiency.`,

                    `Leveraged libraries such as <strong>PyVista</strong>, <strong>Vedo</strong>, <strong>Trimesh</strong>, 
                    and <strong>MeshLab</strong> to create a robust program capable of precisely manipulating 
                    3D models to meet product specifications.`,

                    `Designed and implemented an interactive frontend using <strong>Three.js</strong>, enabling 
                    users to manually adjust and manipulate .stl files directly within the application.`
                ],
                skills: ['3D Visualization', '3D Mesh Manipulation', 'Python', 'Data Analysis', 'FastAPI', 'ThreeJS']
            }
        ] 
    }
]