class CHAT_BOT {
  username: string;

  constructor(username) {
    this.username = username;
  }

  helpUser() {
    return {
      Step1:
        "First provide your credentials in the following JSON format to join fastifyApp room",
      credentials: {
        type: "auth",
        username: "Your db username",
        password: "Your db password",
      },
      Step2: "Type in your message following JSON format",
      message: {
        type: "message",
        room: "fastifyApp",
        text: "Your message",
      },
      finally: "Use more than one connection to chat, Enjoy :)",
    };
  }
}

const chatBot: any = new CHAT_BOT("Chat Bot");
const message = chatBot.helpUser();
const helperBot = JSON.stringify(message);

export default helperBot;
