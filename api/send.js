import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // 프론트엔드(App.tsx)의 fetch body에서 보낸 데이터를 꺼내옵니다.
    const { to, subject, html } = req.body;

    const data = await resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to: to, // 테스트 중일 때는 무조건 본인의 가입 이메일 주소로 하드코딩해도 됩니다.
      subject: subject,
      html: html,
    });

    return res.status(200).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}