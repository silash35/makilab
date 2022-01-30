# Makilab

This is the offline version of the Makilab software. Now it is a program that runs locally without the need for internet. It is recommended for companies that are not interested in maintaining a Web server.
Some features, such as the client interface, have been removed, as they only make sense on a remote server

All code is in the public domain. So feel free to customize it to your company's needs and use freely

## Git Flow

The project branches are organized as follows:
New features and bug fixes are added in Branch Develop. And if the code is working correctly, it is merged to the master branch and to the offline-master branch.

What differs the offline-master branch from the master branch is that the offline-master branch contains modifications that allow the project to work locally as an application. That's why the offline-master branch should never be merged with the master branch or even the develop branch.

As you can see, this repository does not use a full git flow, as there is no need for it for now.