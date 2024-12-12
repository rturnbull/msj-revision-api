###MSJ / Main Street Journal Revision API###

####Service name
msj_revision_api

####Routes
```POST /api/v1/revision```

Request body: ```{prompt, text}```

Response: ```{title, lede, body}```


the constoller calls ```Revision.getRevision(text, prompt)```



model = ChatModel.getModel()
Runner.run(model, prompt, text)

a thing that encapsulates use case specific
- system prompt
- user prompt
- raw text input
- response schema 

Expected usage
the UI client provides the prompt (the operator) and the text (the operand)
in the body of the HTTP request.  

The controller assembles the 
- user prompt
- raw text input
- system prompt
- response schema 

...and calls the API with the required payload.  

...and returns the response object.