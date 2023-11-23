# cloudflare-workers-ai
Experimental use of Cloudflare Workers AI

## How to use
1. Clone this repository
2. Install Wrangler
3. Edit the `API_KEY` var or add it as a secret (preferred)
4. Run `wrangler dev --remote` to start the server
5. Let's go!

[Docs for itty router](https://itty.dev/itty-router)

## Endpoints
### Create Text
- `http://localhost:8787/create/text?auth=secret&prompt=Can%20you%20tell%20me%20about%20Thomas%20Sowell?` - mistral-7b
### Look at Text
- `http://localhost:8787/look/text?auth=secret&text=I%20love%20pizza` - distilbert-sst-2
```json
[
  {
    "label": "NEGATIVE",
    "score": 0.0002510220801923424
  },
  {
    "label": "POSITIVE",
    "score": 0.9997490048408508
  }
]
```
### Create Image
- `http://localhost:8787/create/image?auth=secret&prompt=Disco%20Dog` - stable-diffusion-xl-base
![Example image](image.png)

### Look at Image
- `http://localhost:8787/look/image?auth=secret&url=https%3A%2F%2Fimages.unsplash.com%2Fphoto-1682686581551-867e0b208bd1%3Fq%3D80%26w%3D3870%26auto%3Dformat%26fit%3Dcrop%26ixlib%3Drb-4.0.3%26ixid%3DM3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%253D%253D` - resnet-50
```json
{
  "inputs": {
    "image": [
      "https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ]
  },
  "response": [
    {
      "label": "CORAL REEF",
      "score": 0.5838099718093872
    },
    {
      "label": "SCUBA DIVER",
      "score": 0.3282018303871155
    },
    {
      "label": "SNORKEL",
      "score": 0.07677122205495834
    },
    {
      "label": "BRAIN CORAL",
      "score": 0.006402952130883932
    },
    {
      "label": "SEA SNAKE",
      "score": 0.000826448667794466
    }
  ]
}
```
![Looked at image](https://images.unsplash.com/photo-1682686581551-867e0b208bd1?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D) via Unsplash