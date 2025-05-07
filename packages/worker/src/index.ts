import BiLiApi from './api';
import { getTokenFromCookie } from './utils';

async function signIn(cookie: string, activityId: string) {
	const token = getTokenFromCookie(cookie);
	if (!token) {
		console.log('无效的 cookie');
		return;
	}
	const api = new BiLiApi(cookie);
	let activityInfo = await api.getActivityInfo(activityId);
	const { has_sign_today, has_finish_sign_activity } = activityInfo.data.task_group.user_sign_info;
	if (has_sign_today) {
		console.log('今天已经签到过了');
		return;
	}
	if (has_finish_sign_activity) {
		console.log('签到活动已经完成');
		return;
	}
	await api.todaySignIn(activityId);
	activityInfo = await api.getActivityInfo(activityId);
	const prizes = activityInfo.data.task_group.task_list.filter(
		(task) => task.complete_status === 1 && task.award_grant_status === 0 && task.task_award_list[0].prize.remain > 0
	);
	if (prizes.length === 0) {
		console.log('暂无可领取的奖励');
		return;
	}
	for (const prize of prizes) {
		const { task_id } = prize;
		console.log(`领取任务 ${prize.task_award_list[0].prize.prize_name} 的奖励`);
		await api.getSigninPrize(activityId, task_id);
	}
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname } = new URL(request.url);
		if (pathname === '/trigger_signin') {
			const { COOKIE, ACTIVITY_ID } = env;
			await signIn(COOKIE, ACTIVITY_ID);
			return new Response('触发签到成功');
		}
		return new Response('Hello World!');
	},
	async scheduled(event, env, ctx) {
		const { COOKIE, ACTIVITY_ID } = env;
		await signIn(COOKIE, ACTIVITY_ID);
	},
} satisfies ExportedHandler<Env>;
