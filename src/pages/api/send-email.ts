import { NextApiRequest, NextApiResponse } from "next";
import { handleSendEmail } from "../../lib/email-helper";
import { render } from "@react-email/render";
import Email from "@/emails/Email";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { method, body } = req;
    switch (method) {
      case "POST": {
        const { id, email, imgUrl, firstName, lastName } = body;

        try {
          await handleSendEmail({
            to: email,
            subject: "Certificate: Google DevFest 2023",
            html: render(Email({ id, firstName, lastName })),
            attachments: [
              {
                filename: `Certificate_${id}.png`,
                path: imgUrl,
              },
            ],
          });
          return res.status(200).json({ message: "Success" });
        } catch (err: any) {
          res.status(500).json({ message: err.message });
        }

        break;
      }
      case "GET": {
        res.status(200).json(req);
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
