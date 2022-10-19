import { IncomingHttpHeaders } from 'http'
import https from 'https'

interface Response {
    statusCode: number
    headers: IncomingHttpHeaders
    body: string
}
export default (urlOptions: string | https.RequestOptions, data = '') => new Promise((resolve: (value: Response) => void, reject) => {
    // Inspired from https://gist.github.com/ktheory/df3440b01d4b9d3197180d5254d7fb65
    const req = https.request(urlOptions, res => {
        // I believe chunks can simply be joined into a string
        const chunks = []

        res.on('data', chunk => chunks.push(chunk))
        res.on('error', reject)
        res.on('end', () => {
            const { statusCode, headers } = res
            const validResponse = statusCode >= 200 && statusCode <= 299
            const body = chunks.join('')

            if (validResponse) resolve({ statusCode, headers, body })
            else reject(new Error(`Request failed. status: ${statusCode}, body: ${body}`))
        })
    })

    req.on('error', reject)
    req.write(data, 'binary')
    req.end()
})