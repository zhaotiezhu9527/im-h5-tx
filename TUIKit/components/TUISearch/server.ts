import TUICore, { TUIConstants } from "@tencentcloud/tui-core";
import {
  TUIUserService,
  TUIGroupService
} from "@tencentcloud/chat-uikit-engine";

export default class TUISearchServer {
  constructor() {
    TUICore.registerService(TUIConstants.TUISearch.SERVICE.NAME, this);
  }

  public onCall(method: string, params: Object) {
    return method;
  }

  public async searchFriend(userID: string): Promise<any> {
    return TUIUserService.getUserProfile({userIDList: [userID]});
  }

  public async searchUser(userID: string): Promise<any> {
    return TUIUserService.getUserProfile({userIDList: [userID]});
  }
  public async searchGroupMember(groupID: string, userID: string): Promise<any> {
    return TUIGroupService.getGroupMemberProfile({
      groupID,
      userIDList: [userID],
    })
  }
}
