    🎯 Display all posts on the page, with an option to sort them in ascending or descending order. #DONE
    🎯 Create a SQL schema for a posts table and a comments table, with the comments being connected to the posts table with a foreign key. #DONE
    🎯 Create a delete button on posts that allows users to delete the post from the database. #DONE
    🎯 Create a form which saves comments to a dedicated comments table, with the comments being connected to the posts table with a foreign key. #DONE
    🎯 Allow users to comment on individual posts in their dynamic routes. Comments should be associated with posts, and have a dynamic route (e.g. /posts/:postid).#DONE
    🎯 Add a redirect when a user creates a post to redirect them to the posts page.#DONE

    🏹 Implement a select input (or similar mechanism) that allows users to categorise posts during creation, storing them in their own table in the database. Ensure appropriate routing for categories, with endpoints such as /categories and /categories/:id to enable users to browse and interact with posts by category.#done? (character they are posting about should count as a "category")
    🏹 Create an edit functionality accessible via /posts/:id/edit, which pre-fills a form for post data. Create a working PUT route to update the post in the database.
    🏹 Develop an edit comment feature accessible via /posts/:id/comments/:id/edit, which pre-fills a form for comment data. Create a working PUT route to update the comment in the database.


    🎯 What requirements did you achieve?
    I have achieved all requirements except for the edit stretch goals.
    🎯 Were there any requirements or goals that you were unable to achieve?
    edit stretch goals, simply had no time to do them due to getting a slow start (only 30% of the project was done by 12pm on sunday)
    🎯 If so, what was it that you found difficult about these tasks?
    Lack of time to finish this project.

Due to the state my project was in at the deadline I couldnt just leave it there so I went over the deadline by about an hour excluding writing this reflection and breaks to calm myself down before I did last minute duct tape to the final features that were desperate to fall apart.
During the seeding the growth rates table I have came to the realisation that the database that I was extra careful to construct to avoid problems that can't be solved turned out to have a flaw, that was too late to be solved since I had already seeded 5 out of the 6 characters. Due to the layout each character class combo had to be seeded individually along with all their stats growth. If an unpremoted unit, that can reclass, will have around 10 classes for that 1 character, and growth rates need to be seeded for each of them. I realised a better way of doing it was when I noticed the growth rates were just the addition of personal growths for each character and the class growth rates added together, using this knowledge I would only have to seed class growths for all the classes, and for each new character, insert their personal growths and all valid character-class combinations into a junction table and when displayed the growth rates the server can just add personal and class growths. This reform will make it signifigantly easier to add more characters in the future. Also certain actions such as onClick not being available in server and db.queries not being available in client and server components cant even be used in clients made certain features an actual nightmare to implement. not being able to use onClick for buttons but instead using a form, which only has one button (type submit), and the action is the exact same function I wanted to use for onClick is quite silly. Due to already being late I don't have any time to look for bugs or test the vercel render other than double checking the env variables so I am praying that everything worked like they did when I completed each feature.
