import { QRCodeSVG } from "qrcode.react";
import React from "react";

export enum LoginQrcodeStatus {
    未扫码 = 1,
    扫码未登录 = 2,
    二维码过期 = 3,
    登录成功 = 0,
}

type LoginQRcodeType = {
    loginUrl: string;
    loginQrcodeStatus: LoginQrcodeStatus;
    handleRefresh: () => void;
};

const LoginQRcode: React.FC<LoginQRcodeType> = (props) => {
    const { loginUrl, loginQrcodeStatus, handleRefresh } = props;

    return (
        <div className="mt-4 border border-neutral-100 p-1.5 rounded-xl  cursor-pointer relative overflow-hidden">
            <QRCodeSVG
                className="bg-neutral-50 p-0.5"
                width={168}
                height={168}
                value={loginUrl}
            />

            {loginQrcodeStatus === LoginQrcodeStatus.登录成功 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50/90">
                    <div className="bg-neutral-50 p-4 rounded-full">
                        <img
                            width={24}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAALVBMVEUAAAAAruwAr+gAr+8AruwAr+0AruwArewArewAruoAr+0AreoAruwAr+8AruxhtUK1AAAADnRSTlMA3yAw73/Pv6+gb2BfEBsASO0AAACJSURBVCjP5c6xCYBAEATAx88MDQxFOzCwDrECS7AIC7EUsQVL+EDMrgafu4fj2UuMDNxwGZZ1v41fVqse6LbwSMHErBFTZeLQvsRlfVh4p8ta3ogmY3mmyPHGSZHjjaJhDp+7xBUrB6xcsXLAiSvOOODEFWccsHDBwAUDZwxcMHDByBlDfO++zQODr3TFpNv2JwAAAABJRU5ErkJggg=="
                        />
                    </div>
                    <div className="text-sm flex flex-col items-center mt-1 text-neutral-800">
                        <div>登录成功</div>
                        <div>cookie 已存入剪切板</div>
                    </div>
                </div>
            )}
            {loginQrcodeStatus === LoginQrcodeStatus.扫码未登录 && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50/90">
                    <div className="bg-neutral-50 p-4 rounded-full">
                        <img
                            width={24}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACwAAAAsBAMAAADsqkcyAAAALVBMVEUAAAAAruwAr+gAr+8AruwAr+0AruwArewArewAruoAr+0AreoAruwAr+8AruxhtUK1AAAADnRSTlMA3yAw73/Pv6+gb2BfEBsASO0AAACJSURBVCjP5c6xCYBAEATAx88MDQxFOzCwDrECS7AIC7EUsQVL+EDMrgafu4fj2UuMDNxwGZZ1v41fVqse6LbwSMHErBFTZeLQvsRlfVh4p8ta3ogmY3mmyPHGSZHjjaJhDp+7xBUrB6xcsXLAiSvOOODEFWccsHDBwAUDZwxcMHDByBlDfO++zQODr3TFpNv2JwAAAABJRU5ErkJggg=="
                        />
                    </div>
                    <div className="text-sm flex flex-col items-center mt-1 text-neutral-800">
                        <div>扫码成功</div>
                        <div>请在手机上确认</div>
                    </div>
                </div>
            )}
            {loginQrcodeStatus === LoginQrcodeStatus.二维码过期 && (
                <div
                    className="absolute inset-0 flex flex-col items-center justify-center bg-neutral-50/90"
                    onClick={handleRefresh}
                >
                    <div className=" bg-neutral-50 p-4 rounded-full">
                        <img
                            width={24}
                            src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACgAAAAoCAMAAAC7IEhfAAAARVBMVEUAAAAAruwArusAruwAruwArewAq+sArusAresAr+sAruwAr+8Aru8AruwAruwAr+cArewAr+0AruwArewAr98ArusAruy8BWrbAAAAFnRSTlMA76DfcL9AMJBAgCAQz68gYI9fUBDPY12YwgAAAUZJREFUOMuNlFuShCAMRcNTQEBbp9n/UkcTuhnKKHN/rIqHXBII0MvrrEQpIuXg4VYxHEyTkjOPvcpFHKpFYaQ2OLQb813x+vxx626t1VLVwOvwOj6p2hoMCmebxSSJTNGeHwq+MWQW6LQQahBsvkIzGyfyA67ITcBoohIJnHHfyHFkA3EnmsV8COkLzthZPl1pqgkXFnSNUwDqNiGsDdzAPlQC2pCkBQiUd6xMzmMl7M1AMQKcDfUDLpzFlBFInRb/AKkxaL2PQYH9Xp8wumwJ2+OeMDrkDHrYcDQNYIfVTJUQI2+JnnTYYr7F2n2NOD/3YLuvrjwdt24DEAUO4UMlaqmLRuO69bOhWd++J4Z95GYKv6EppkLoH38vKWZ+2MlUUnvvd+1UDbjLaKrCiHu5FnnlHNoyqOqyBcR42ZCTOBiVtYVOvw1hKHrM5JK6AAAAAElFTkSuQmCC"
                        />
                    </div>
                    <div className="text-sm flex flex-col items-center mt-1 text-neutral-800">
                        <div>二维码已过期</div>
                        <div>请点击刷新</div>
                    </div>
                </div>
            )}
        </div>
    );
};
export default LoginQRcode;
