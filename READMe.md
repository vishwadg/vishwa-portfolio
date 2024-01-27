# Welcome
Welcome to [Vishwa's Portfolio](https://vishwadeepghimire.com/). This is built using [Gatsby](https://www.gatsbyjs.com/). Hosted with [AWS](aws.amazon.com) using following services:

- S3
- API Gateway
- Lambda
- DynamoDB
- Route53
- CloudFront

# Project Timeline

## Sun Jan 14, 2024
- **Setup**: Initial project setup and commit

## Mon Jan 15, 2024
- **Selection**: Selected project template and Gatsby as the front-end framework

## Sat Jan 20, 2024
- **Configuration**: Started working on Gatsby configurations
  - Created configuration and utils files

## Sun Jan 21, 2024
- **Development**: Worked on index files, icons, styles, hooks, and project dependencies

## Mon Jan 22, 2024
- **Design**: Created logos, introduction, and about sections

## Tue Jan 23, 2024
- **Section Creation**: Established Jobs, Blog, and Contact sections
- **Infrastructure**: Purchased a domain name [vishwadeepghimire.com](https://vishwadeepghimire.com/) for website hosting

## Wed Jan 24, 2024
- **Feature Implementation**:
  - Developed Contact form with client-side validation and success/error messages
  - Implemented the Education section
  - Created data for Jobs, Blog, and Education sections
  - Set up Lambda for the Contact Form and integrated it with DynamoDB for data storage, also integrated it with API Gateway

## Thu Jan 25, 2024
- **Infrastructure Enhancement**:
  - Set up S3 bucket
  - Integrated the contact form with backend API using API Gateway endpoint

## Fri Jan 26, 2024
- **Infrastructure Configuration**:
  - Configured Route53 and requested a certificate from ACM (Amazon Certificate Manager)
  - Implemented CloudFront and placed it in front of the S3 bucket
- **Automation**:
  - Added CI/CD workflow for automatic deployment to the S3 bucket upon new code push to GitHub
  - Added a script to invalidate CloudFront cache when new changes are pushed to S3

## Sat Jan 27, 2024
- **Content Update**:
  - Added more blogs
  - Updated descriptions for Education and About Me sections

