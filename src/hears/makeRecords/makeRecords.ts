import { CustomContext } from '../../types';
import { rawStringToRecords } from '../../helpers/rawStringToRecords';
import { User } from '../../mongoose';

export const makeRecords = async (ctx: CustomContext) => {
  const last = ctx.session.lastMessageTable;
  const { id } = ctx.user;
  const records = await User.pushRecords(id, rawStringToRecords(ctx.msg?.text));
  if (!records) return;
  const { message_id } = await ctx.printOrEditTable(records, last);
  setTimeout(() => ctx.deleteMessage(), 500);
  if (!last && message_id) ctx.session.lastMessageTable = message_id;
  ctx.session.lastPurchaseDate = ctx.state.today
};