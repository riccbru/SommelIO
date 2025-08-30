import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
	if (!req.accepts("html")) {
		res.json({ message: "Welcome to SommelIO 🍷" });
	} else {
		res.send(`
      		<!DOCTYPE html>
      		<html lang="en">
      			<head>
					<meta charset="UTF-8">
      			  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
      			  	<title>SommelIO</title>
      			  	<style>
      			  	  body {
      			  	    height: 100vh;
      			  	    display: flex;
      			  	    justify-content: center;
      			  	    align-items: flex-start;
      			  	    font-family: sans-serif;
      			  	  }
      			  	  .message {
      			  	    margin-top: 25vh;
      			  	    font-size: 2.5rem;
      			  	    text-align: center;
      			  	  }
      			  	</style>
      			</head>
      				<body>
						<div class="message">Welcome to SommelIO 🍷</div>
      				</body>
      		</html>
    	`);
	}
});

export default router;
