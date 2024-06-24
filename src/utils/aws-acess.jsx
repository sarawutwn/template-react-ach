import * as aws from "aws-sdk";

const s3 = new aws.S3({
    accessKeyId: import.meta.env.VITE_AWS_ID,
    secretAccessKey: import.meta.env.VITE_AWS_SECRET
});

const getSignedURL = async (key) => {
    return new Promise((resolve) => {
        s3.getSignedUrl('getObject', {
            Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
            Key: key,
            Expires: 30,
        }, function (err, data) {
            if (err) {
                console.log(err)
            } else {
                resolve(data)
            }
        })
    })
}


const uploadSignedUrl = async (key, file, type) => {
    let contentType = ''
    if (type === 'image') {
        contentType = 'multipart/form-data'
    }
    if (type === 'zip') {
        contentType = 'application/octet-stream'
    }
    if (type === 'pdf') {
        contentType = 'application/pdf'
    }
    return new Promise((resolve) => {
        s3.getSignedUrl('putObject', {
            Bucket: import.meta.env.VITE_AWS_BUCKET_NAME,
            Key: key,
            Expires: 60,
            ContentType: contentType
        }, async function (err, data) {
            if (err) {
                console.log(err)
            } else {
                let res = await fetch(data, {
                    method: 'PUT',
                    body: file,
                    headers: {
                        'Content-Type': contentType
                    }
                })
                if (res.status === 200) {
                    resolve('success')
                }
            }
        })
    })
}

export default { getSignedURL, uploadSignedUrl }