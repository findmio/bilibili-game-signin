import { fetch } from "@tauri-apps/plugin-http";

export interface LoginStatusType {
    code?: number;
    data?: {
        code?: number;
        message?: string;
    };
}

export interface GetQRCodeType {
    code?: number;
    message?: string;
    data?: {
        qrcode_key?: string;
        url?: string;
    };
}

const headers = {
    accept: "*/*",
    "accept-language": "zh-CN,zh;q=0.9",
    origin: "https://www.bilibili.com",
    priority: "u=1, i",
    referer: "https://www.bilibili.com/",
    "sec-ch-ua":
        '"Chromium";v="136", "Microsoft Edge";v="136", "Not.A/Brand";v="99"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"macOS"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "same-site",
    "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/136.0.0.0 Safari/537.36 Edg/136.0.0.0",
};

export const getLoginQRCode = async (): Promise<GetQRCodeType> => {
    const response = await fetch(
        "https://passport.bilibili.com/x/passport-login/web/qrcode/generate?source=main-fe-header&go_url=https:%2F%2Fwww.bilibili.com%2F&web_location=0.0",
        {
            method: "GET",
            headers,
        }
    );
    const responseData = await response.json();
    return responseData;
};

export const getLoginStatus = async (qrcodeKey: string): Promise<Response> =>
    await fetch(
        `https://passport.bilibili.com/x/passport-login/web/qrcode/poll?qrcode_key=${qrcodeKey}&source=main-fe-header&web_location=0.0`,
        { method: "GET", headers }
    );
