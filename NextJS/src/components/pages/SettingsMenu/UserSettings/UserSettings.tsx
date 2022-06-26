import Modal from "components/core/display/molecules/Modal";
import Switch from "components/core/input/atoms/Switch";
import PromptAreYouSure from "components/core/input/molecules/PromptAreYouSure";

import useTranslation from "next-translate/useTranslation";
import { useCallback, useMemo, useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";

import { useClientsStore } from "store/useClients";

import Buttons from "styles/Buttons";
import Text from "styles/Text";
import cookieManager from "util/cookies/loginCookieManager";
import Styled from "./UserSettings.styles";
interface IUserSettingsProps {}

function UserSettings(props: IUserSettingsProps): JSX.Element {
  const { isPremium, spotifyUser: user } = useClientsStore().user;
  const setIsPremium = useClientsStore((s) => s.setIsPremium);

  const avatarSrc = useMemo(() => user?.images?.[0].url, [user?.images]);

  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const db = useClientsStore((s) => s.backendDbApi);
  const { t } = useTranslation();

  const dropUser = useCallback(async () => {
    const res = await db.dropUser(cookieManager.loadJWT() || "");

    if (res) {
      toast.error((t("settings:ther-was-an-error-wh") || " ") + res.message);
    } else {
      toast.success(t("your-account-was-suc"));
    }
  }, [db, t]);

  return (
    <Styled.Col>
      <Text.Inline>
        <h4>
          {t("settings:user-settings-for", {
            0: user?.display_name || t("settings:stranger"),
          })}
        </h4>
        {avatarSrc && (
          <Styled.Avatar
            src={avatarSrc}
            alt={user?.display_name || t("settings:user-pic")}
          />
        )}
      </Text.Inline>

      <article>
        <Switch isChecked={isPremium} onToggle={() => setIsPremium(!isPremium)}>
          <p>{t("settings:show-spotify-premium")}</p>
        </Switch>
        <Styled.Padding>
          <p>{t("settings:this-option-enables-")}</p>
          <ul>
            <li>{t("settings:play-this-track-albu")}</li>
            <li>{t("settings:add-track-to-queue")}</li>
            <li>{t("settings:skip-track")}</li>
          </ul>
        </Styled.Padding>
      </article>
      <hr />
      <Buttons.PrimaryRedButton onClick={() => setShowDeleteModal(true)}>
        {t("settings:delete-account")}
      </Buttons.PrimaryRedButton>
      <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <PromptAreYouSure
          message={t("settings:do-you-really-want-t")}
          onCancel={() => {}}
          onClose={() => setShowDeleteModal(false)}
          onSure={dropUser}
          svg={<BsFillTrashFill />}
        />
      </Modal>
    </Styled.Col>
  );
}

export default UserSettings;
