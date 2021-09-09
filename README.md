# Snack Attack

### Project Description: 

Project Name: Cross Amazon

Under the social background of epidemic, more and more people begin to rely on online shopping. We want to build a website similar to Amazon to give people one more choice to shop. The functions of the website will be clarified after subsequent discussions.

Meeting Time: Thursday 6:00 pm

### Team Member Bios:

##### Yu Zhang - Team Lead

Last semester at EMU, husband of a perfect wife, father of two children（One was born three months later). Active, workaholic, loves all sports and always wants to finish ahead of schedule.

##### Alex London - Deputy Team Lead

This is my last semester at EMU as a second bachelor's student. I was previously an intern and associate software engineer at Learning A-Z in Ann Arbor. I like video games, board games, camping, and hiking.

##### Ke Shao - Team Member

I am a graduate student at Eastern Michigan Universiy majoring in Computer Science and plan to graduate in the 2022. I like traveling, music and taking care of my babies.

##### Sandra Sabatini - Team Member

This is my last semester at EMU, majoring in Computer science, and mathematics. Married to a good guy, involved in my church, and i enjoy gardening and working out. 

##### Kulwinder Kaur - Team Member

This is my second last semester at EMU.I work in Healthcare DME as a billing assistant. I like play Tennis, Travelling and spend time with my family.

### Commit Message Guideline

Commits should be structured as shown below.

    Commit Message Title

    Content of commit message. 

    GitHub Issue #


Commit Message Title: Briefly explain what the commit is for.

Content of commit message: Describe what has been changed in this commit and why it has been changed.
If the commit is fixing a bug, for instance, you should explain why the bug was occurring and how the changes in this commit resolve it.
If there is something unusual or confusing in your changes, clarify why it was done that way. 
Your commit message is an opportunity to help your teammates and yourself understand your changes.

GitHub Issue #: The bottom line should have the Issue # so that everyone can know what issue this commit is associated with.

### Pull Request Guideline

Your working branch should be synced with main before submitting a pull request. Follow these steps to do that:

    1. Git pull. This makes sure that main is up to date.
    2. Git merge main. Do this while in the working branch. This updates your working branch with any changes in main. At this point there may be conflicts.
        - If there are conflicts:
        1. Resolve conflicts in necessary files.
        2. Git add & git commit. This stages and commits the changes from the conflict resolution.
    3. Git push origin workingBranchName. This pushes any changes in the local working branch to the remote working branch.

We do this because it allows us to resolve merge conflicts before creating the pull request. This has the benefit of resolving the conflicts early, before the working branch is being merged to main.

Once you have done the above procedure, you should create a pull request in GitHub.
The title of the pull request should be a brief description of the purpose of the pull request. For example: Improved main page layout.
The body of the pull request should have a detailed summary of the changes and why they were made, much like the commit messages discussed above. The purpose of this comment is to help your code reviewer understand your changes, so explain anything that may be difficult or confusing to understand.
Assign a team member to review the pull request.
Add any relevant labels.
Link the relevant issue case. This helps the reviewer know what issue case this pull request is resolving, and also allows the issue to be automatically resolved once the pull request is merged.
