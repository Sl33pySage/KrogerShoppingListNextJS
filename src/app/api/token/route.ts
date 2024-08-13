

export default async function TokenHandler() {
  const dt = new URLSearchParams({
    grant_type: "client_credentials",
    scope: "product.compact"
  })
  

  const res = await fetch('https://api-ce.kroger.com/v1/connect/oauth2/token', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      'Authorization':`Basic ${btoa(`${process.env.client_id}:${process.env.client_secret}`)}`,
    },
    body: dt,
  });
  

       
  const data = await res.json()
  return await data
}

