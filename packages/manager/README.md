# Makilab

Makilab was a multi-brand authorized technical assistance. And this software was created to help the company manage its work orders. In addition, it provides an interface for the customer to check the status of his equipment.

All code is in the public domain. So feel free to customize it to your company's needs and use freely
offline
consumer-example

## Getting Started

First, run the development server:

```bash
pnpm dev
```

Then, open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Git Flow

The project branches are organized as follows:
New features and bug fixes are added in Branch Develop. And if the code is working correctly, it is merged to the master branch and to the offline-master branch.

What differs the offline-master branch from the master branch is that the offline-master branch contains modifications that allow the project to work locally as an application. That's why the offline-master branch should never be merged with the master branch or even the develop branch.

As you can see, this repository does not use a full git flow, as there is no need for it for now.
