
**What is WebEdit Pro?** 
It is completely free and open source chrome extension

**What does it do?**
It finds and replaces the texts of the website

**How is it different from other text replacing extensions?**
- WebEdit Pro is very sophisticated text replacing extension. 
- It offers enable/disable option on website list, find & replace texts. With this, user need not delete the data to stop the text replacement rather enable/disable the items.
- When you have thousands of entries, it is painful to use form and save all those entries. WebEdit Pro offers a powerful feature called "Bulk edit" (inspired by postman) to add hundreds and thousands of entries at once

**An usecase for this extension-**
Github doesn't offer a feature to choose what name to display in repositories 
https://github.com/orgs/community/discussions/10840

If user names are auto generated for a team sometimes it goes with the alphanumeric Ids K43234 as mentioned here https://github.com/orgs/community/discussions/10840#discussioncomment-2814682 

It will be painful for the contributors of that repository to read things, imagine there are 100 users under that repository with auto generated alphanumeric ids and whenever there is a notification 

"K43234 committed a new change"
"K43235 raised a new PR"

With mapping like follows,

K43234 -> "John"
K43235 -> "Bruce"
...

WebEdit Pro can find & replace Alpha numeric username to desired name, with bulk edit feature in place, it is easy to do the mapping even for 1000 users at once

**result would be:**
"John committed a new change"
"Bruce raised a new PR"


As mentioned above it is an open source following is repo
Github link - https://github.com/cyberfury10/web-edit-pro

**About the project & How to run:**
This extension is created with react and custom webpack configuration

Following command generates `dist` folder, 
`npm run build`
`npm run build:dev`

In developer mode `dist` folder can be loaded in chrome

For UI related changes, application can be started using `npm start`
