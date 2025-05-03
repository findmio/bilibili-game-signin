import ky from 'ky';
import { getTokenFromCookie } from './utils';

interface ActivityInfoType {
	code: number;
	data: {
		title: string;
		task_group: {
			task_list: [
				{
					task_id: string;
					/**
					 * 完成状态
					 * 0: 未完成
					 * 1: 已完成
					 */
					complete_status: number;
					/**
					 * 领取状态
					 * 0: 未领取
					 * 1: 已领取
					 */
					award_grant_status: number;
					task_award_list: [
						{
							prize: {
								/**
								 * 礼包名称
								 */
								prize_name: string;
								/**
								 * 剩余奖励数量
								 */
								remain: number;
							};
						}
					];
				}
			];
			max_sign_times: number;
			user_sign_info: {
				has_sign_today: boolean;
				sign_total: number;
				has_finish_sign_activity: boolean;
			};
		};
	};
}

export default class BiLiApi {
	private headers = {
		'User-Agent':
			'Mozilla/5.0 (Linux; Android 12; Mi 10 Build/SKQ1.211006.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/96.0.4664.104 Mobile Safari/537.36 os/android model/Mi 10 build/8330200 osVer/12 sdkInt/31 network/2 BiliApp/8330200 mobi_app/android channel/xiaomi innerVer/8330210 c_locale/zh_CN s_locale/zh_CN disable_rcmd/0 themeId/1 sh/33',
		Accept: 'application/json, text/plain, */*',
		'Accept-Encoding': 'gzip, deflate',
		origin: 'https://app.biligame.com',
		'x-requested-with': 'tv.danmaku.bili',
		'sec-fetch-site': 'same-site',
		'sec-fetch-mode': 'cors',
		'sec-fetch-dest': 'empty',
		referer: 'https://app.biligame.com/',
		'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
		cookie: '',
	};

	constructor(public cookie: string) {
		this.headers.cookie = cookie;
	}

	async getActivityInfo(activityId: string) {
		const response = await ky
			.get<ActivityInfoType>('https://line1-h5-mobile-api.biligame.com/game/center/h5/activity/api/detail/customize', {
				searchParams: {
					sdk_type: '1',
					activity_id: activityId,
				},
				headers: this.headers,
			})
			.json();
		return response;
	}

	async todaySignIn(activityId: string) {
		const token = getTokenFromCookie(this.headers.cookie)!;
		const response = await ky
			.post('https://line1-h5-mobile-api.biligame.com/game/center/h5/gift/activity/sign_in', {
				headers: this.headers,
				body: new URLSearchParams({
					activity_id: activityId,
					timestamp: Date.now().toString(),
					build: '8330200',
					source_from: '233',
					cur_host: 'app.biligame.com',
					client: 'android',
					platform: 'android',
					model: 'Mi 10',
					csrf_token: token,
				}),
			})
			.json();
		return response;
	}

	async getSigninPrize(activityId: string, taskId: string) {
		const token = getTokenFromCookie(this.headers.cookie)!;
		const response = await ky
			.post('https://line1-h5-mobile-api.biligame.com/game/center/h5/activity/api/task/award/receive', {
				headers: this.headers,
				body: new URLSearchParams({
					sdk_type: '1',
					activity_id: activityId,
					task_id: taskId,
					timestamp: Date.now().toString(),
					build: '8330200',
					source_from: '233',
					cur_host: 'app.biligame.com',
					client: 'android',
					platform: 'android',
					model: 'Mi 10',
					csrf_token: token,
				}),
			})
			.json();
		return response;
	}
}
