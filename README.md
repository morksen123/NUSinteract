Proposal for Orbital 2022

Team Members: 
Chang Han Yang - Y1 Information Systems (SOC)
Zenden Leong Wee Teng - Y1 Business Analytics (SOC)

Team Name: 

NUSinteract 

Proposed Level of Achievement: 

Artemis / Apollo 11 

Motivation 

Due to the ongoing COVID-19 pandemic, social interaction has been greatly reduced in NUS as most lessons have transited to an online setting. The lack of physical interaction has reduced the number of opportunities to make friends and network in NUS. Lack of social interaction may lead to one feeling isolated in school and may negatively impact one’s mental health. Social interaction is often overlooked but plays a crucial role in shaping a vibrant NUS life. Friends act as a pillar of support to help one through difficult times. Networking allows one to meet new people and widen one’s horizons.

Aim 

Our project aims to open up more opportunities for interaction amongst NUS students on campus.   


User Stories

A student will be able to make a request and choose the purpose of social interaction based on 3 different categories - Entertainment, Studies, Meal. Other Users can accept this request to proceed with the activity on the map.

Category
Entertainment: Sports, Social Gatherings
E.g A team of 3 players may require 1 more player to join a badminton match and can use the app and make a request to find the nearest user who is willing to join the game. 

Studies: Form a project group, study group. 

E.g A student is interested in forming a study group with people from their faculty so that they can help each other out in their modules. The student can make a request to find another student willing to study together in real time.

Meal: Have a meal with someone else on campus. 

E.g A student may want a companion to eat together during lunch or dinner and can find one by making a request in the app.


Features and Timeline

Mobile app with 3 main features:

1. Main page of app 
 
The main page shows 3 categories of interaction for user to choose (Entertainment, Studies, Meal)

Users can then make a request by typing into the request box what activity they are hosting.

Other users will see this request on the map in real time.
 
2. Google maps with student user icons 

Users can see who have made requests and decide whether they want to accept the request or simply just ignore it
Users can see the location and distance to the request made.


3. Chat function for MATCHED users to chat and proceed with making plans for their activity. 

By the end of May:
Main page - showing a category selection interface and request message box
Registering of student logins, student profile which includes their faculty, name, gender & fun fact.

By end June:
Implementation of google maps and chat function 
Requests to be shown on google maps which users can click on

By mid of July:
Implement a review function that allows students to write about their experience of the meet up.




1) OUTLINE OF FEATURES:
The main page will show 3 categories of interaction for user to choose (Entertainment, Studies, Meal) (3 buttons)

Then the app will prompt the user for the activity they are hosting. (MAHJONG)
Other users will see this request on the map in real time. 
Then they can decide whether they want to accept this MAHJONG SESSION or simply just ignore it
Users can also see the location and distance to the request made. 
The chatbox function will be available for the two parties to have further discussions about the activity.




Project work by 30 May - Milestone 1 (Ideation)
Formulate your project idea clearly
Identify the features for your system
Design your system
Create a development plan
Pick up the necessary technologies
Build a technical proof of concept (e.g., an integrated frontend+backend with the login/register feature)
Document your system

—----------------------------------------------------------------------------------------------
Things to do:
Get template of login page (reactnative) 


Interface 1: LOGIN PAGE
1)Sign in page (Contains all design)
2)NUSinteract logo
3) Form to log in (fill in email & password)
4) 2 buttons: LOGIN & SIGN UP
<Button className= login > & <Button className=Sign-up> (sign-up button leads to interface 1.1– signup page)  

Interface 1.1: SIGN UP PAGE
Form to sign up ( email & password )



Task bar below  < ON ALL PAGES AFTER SIGN IN PAGE>
1) HOME PAGE
2) Profile icon (edit whatever in ur profile e.g status)
3) Chat icon 
4) List of activities (pending, accepted, etc)


Interface 2: HOME PAGE 


1) 2 buttons : HOST ACTIVITY and JOIN ACTIVITY
<Button className= host-activity > & <Button className=join-activity>
(HOST ACTIVITY LEADS TO FORM: ACTIVITY  DETAILS) 
(JOIN ACTIVITY LEADS TO MAP, WHERE USER CAN SEE WHAT ACTIVITIES ARE AVAILABLE)




Interface 3: FORM: ACTIVITY DETAILS (AFTER HOST ACTIVITY BUTTON)
1) FORM TO FILL UP:
Activity name
Category (Entertainment, Studies, Meal)
Timing of activity
Brief Details of activity 
2) 2 buttons : HOST ACTIVITY and BACK
<Button className= host-activity > & <Button className= back>

(HOST ACTIVITY LEADS TO ACTIVITY CREATED 
(BACK LEADS TO HOMEPAGE, WHERE USER CAN SEE WHAT ACTIVITIES ARE AVAILABLE)


Interface 3.1 ACTIVITY CREATED(success page)
1) 1 button: BACK
( BACK LEADS TO HOMEPAGE, WHERE USER CAN SEE WHAT ACTIVITIES ARE AVAILABLE)
2) Small description: 
“ YOUR ACTIVITY HAS BEEN CREATED AND NOW JUST WAIT FOR OTHER STUDENTS TO ACCEPT YOUR REQUEST”


Interface 4: MAP (AFTER JOIN ACTIVITY BUTTON)
1) SIDE COLUMN BAR for filtering categories on map -> FILTER FEATURE
2) ICONS ON MAP -> Interface 4.1 DESCRIPTION OF ACTIVITY 
3) Small Chatbox popup after pressing ‘JOIN’ BUTTON 

Interface 4.1 DESCRIPTION OF ACTIVITY (ONCE USER PRESSED ON THE ICONS ON THE MAP)
DESCRIPTION OF ACTIVITY WITH (REQUEST BUTTON / JOIN BUTTON)
REQUEST -> HOST DECIDES TO DELETE ACTIVITY FROM MAP
JOIN -> AUTO DELETE FROM MAP ONCE MAX PAX HAS BEEN REACHED

Interface 5: Chatbox (TASK BAR CHAT ICON LEADS TO CHATBOX)
1) List of chats + standard chat functions (delete chat…)

Interface 6: List of Activities 
1) Activities Joined and their brief details
2) Pending Activities (Waiting to be accepted)


Interface 7: Profile page
1) Profile Details
2) Description / status box (Can be edited)


Sign in page: react native, supabase 





