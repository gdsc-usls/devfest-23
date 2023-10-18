import { NextApiRequest, NextApiResponse } from "next";
import { handleSendEmail } from "../../lib/email-helper";
import { render } from "@react-email/render";
import Email from "@/emails/Email";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method } = req;
    switch (method) {
      case "POST": {
        await handleSendEmail({
          to: "joshpersonal8@gmail.com",
          subject: "Certificate: DevFest 2023 — Bacolod",
          html: render(Email({ username: "joshxfi" })),
        });
        res.status(200).send("Success");
        break;
      }
      case "GET": {
        res.status(200).send(req);
        break;
      }
      default:
        res.setHeader("Allow", ["POST", "GET", "PUT", "DELETE"]);
        res.status(405).end(`Method ${method} Not Allowed`);
        break;
    }
  } catch (err: any) {
    res.status(400).json({
      error_code: "api_one",
      message: err.message,
    });
  }
};

export default handler;
