import { useState } from "react";
import { useRequest } from "ahooks";
import { writeText } from "@tauri-apps/plugin-clipboard-manager";

import LoginQRcode, { LoginQrcodeStatus } from "./components/LoginQRcode";
import { getLoginQRCode, getLoginStatus, type LoginStatusType } from "./api";
import "./App.css";

function App() {
    const [loginQrcodeStatus, setLoginQrcodeStatus] = useState(
        LoginQrcodeStatus.未扫码
    );

    const { data: qrcodeData, run: getLoginQRCodeRun } = useRequest(
        getLoginQRCode,
        {
            onSuccess: (data) => {
                setLoginQrcodeStatus(LoginQrcodeStatus.未扫码);
                loginStatusRun(data.data?.qrcode_key!);
            },
        }
    );

    const { run: loginStatusRun, cancel: loginStatusCancel } = useRequest(
        getLoginStatus,
        {
            pollingInterval: 1000,
            manual: true,
            onSuccess: async (response) => {
                const data: LoginStatusType = await response.json();
                if (data.code === 0) {
                    // 二维码已扫码，未登录
                    if (data?.data?.code === 86090) {
                        setLoginQrcodeStatus(LoginQrcodeStatus.扫码未登录);
                    }
                    // 二维码已失效
                    if (data?.data?.code === 86038) {
                        setLoginQrcodeStatus(LoginQrcodeStatus.二维码过期);
                        loginStatusCancel();
                    }
                    if (data?.data?.code === 0) {
                        const headers = response.headers;
                        const cookieStr = headers
                            .getSetCookie()
                            .map((cookie) => cookie.split(";")[0])
                            .join("; ");
                        if (cookieStr) {
                            writeText(cookieStr);
                            // 登录成功
                            setLoginQrcodeStatus(LoginQrcodeStatus.登录成功);
                            loginStatusCancel();
                        }
                    }
                }
            },
        }
    );

    const handleRefresh = () => {
        getLoginQRCodeRun();
    };

    return (
        <main className="h-screen w-screen flex items-center justify-center flex-col overflow-scroll">
            <div className="dark:text-neutral-50 text-2xl">扫描二维码登录</div>
            <LoginQRcode
                loginQrcodeStatus={loginQrcodeStatus}
                loginUrl={qrcodeData?.data?.url || ""}
                handleRefresh={handleRefresh}
            />
            <div className="mt-4 dark:text-neutral-50 text-sm">
                请使用
                <span className="text-theme mx-1">哔哩哔哩客户端</span>
                扫码登录
            </div>
        </main>
    );
}

export default App;
