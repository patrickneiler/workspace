# Assistance Chat Feature Development Guide
This document provides a guide on how to develop the Assistance Chat feature for our application. This feature will be a chat interface that allows users to interact with an AI assistant.

Overview
The Assistance Chat feature will display messages from the system, user, assistant, and other roles, each with a different color. It will also provide an input field for the user to send new messages.

Requirements
AssistanceChat Component
This will be the main component of the feature. It will accept the following props:

messages: An array of Message objects to display in the chat.
status: A string representing the current status of the chat. It can be 'awaiting_message' or 'in_progress'.
input: The current value of the input field.
submitMessage: A function to call when the form is submitted.
handleInputChange: A function to call when the input field value changes.
error: An error object to display if there's an error.
Message Type
This is a type that will be imported from the @ranthology/assistance/domain package. Each Message object will have the following properties:

id: A unique identifier for the message.
role: The role of the sender. It can be 'system', 'user', 'function', 'tool', 'assistant', or 'data'.
content: The content of the message.
data: Additional data associated with the message.
Role to Color Mapping
Each role will have a different color. You will need to create a mapping from roles to colors. For example:

system: red
user: black
function: blue
tool: purple
assistant: green
data: orange
Implementation
To implement the Assistance Chat feature, you will need to:

Create the AssistanceChat component with the required props.
Import the Message type from the @ranthology/assistance/domain package.
Implement the role to color mapping.
Render the messages in the chat, each with the color corresponding to its role.
Render the input field and bind it to the input prop and the handleInputChange handler.
Implement the submitMessage handler to be called when the form is submitted.
Display the error if it's not null.
Use the status prop to control the state of the chat and the input field.
Conclusion
The Assistance Chat feature will provide a user-friendly interface for interacting with an AI assistant. It will be flexible and easy to use, making it a great addition to any application that requires user-assistant interaction.