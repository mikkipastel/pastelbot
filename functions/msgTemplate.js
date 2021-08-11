exports.trackNotFound = () => ({
    type: 'text',
    text: 'ไม่พบเลขพัสดุนี้ กรุณากรอกใหม่'
})

exports.trackHeader = (barCode, body) => (
    {
        "type": "flex",
        "altText": "สถานะการส่งพัสดุ",
        "contents": {
            "type": "bubble",
            "size": "giga",
            "body": {
                "type": "box",
                "layout": "vertical",
                "contents": [
                {
                    "type": "text",
                    "text": `${barCode}`,
                    "decoration": "none",
                    "size": "xl",
                    "weight": "bold"
                },
                {
                    "type": "box",
                    "layout": "vertical",
                    "contents": body,
                    "spacing": "sm",
                    "margin": "md"
                }
            ]
        }
    }
 })
 
 exports.trackBody = (detail) => ({
    "type": "box",
    "layout": "horizontal",
    "contents": [
    {
        "type": "box",
        "layout": "vertical",
        "contents": [
            {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                {
                    "type": "text",
                    "text": `${detail.status_date}`
                }
                ]
            },
            {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "text",
                        "text": `${detail.status_description}`,
                        "size": "sm"
                    }
                ],
                "spacing": "none",
                "margin": "md"
            },
            {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "text",
                        "text": `${detail.location}`,
                        "size": "sm"
                    },
                    {
                        "type": "text",
                        "text": `${detail.postcode}`,
                        "size": "sm"
                    }
                ],
                "spacing": "none",
                "margin": "md"
            },
            {
                "type": "box",
                "layout": "horizontal",
                "contents": [
                    {
                        "type": "text",
                        "text": (detail.status === "501") ? `ผู้รับ คุณ${detail.receiver_name}` : " ",
                        "size": "sm"
                    }
                ],
                "spacing": "none",
                "margin": "md"
            }
        ]
    }
    ],
    "backgroundColor": (detail.status === "501") ? "#6BFF6B" : (detail.status === "201") ? "#FCFEC9" : "#EEEEEE",
    "cornerRadius": "md",
    "paddingAll": "10px"
 })
 