import Styled from "./SettingsMenu.styles";
import Text from "styles/Text";

import {
  Tab,
  TabContent,
  TabContentWrap,
  Tabs,
} from "components/core/display/atoms/Tabs";
import UserSettings from "./UserSettings";
import CacheSettings from "./CacheSettings";
import useTranslation from "next-translate/useTranslation";

interface ISettingsMenuProps {}

function SettingsMenu(props: ISettingsMenuProps): JSX.Element {
  const { t } = useTranslation();

  return (
    <Styled.FullH>
      <Text.Center>
        <h1>{t("settings:settings")}</h1>
      </Text.Center>

      <Tabs defaultTabId={"1"}>
        <Styled.TabLayout>
          <Styled.TabWrap>
            <Tab id="1" isColumn>
              <p>{t("settings:user-settings")}</p>
            </Tab>
            <Tab id="2" isColumn>
              <p>{t("settings:cache-settings")}</p>
            </Tab>
          </Styled.TabWrap>
          <TabContentWrap>
            <TabContent id={"1"}>
              <UserSettings />
            </TabContent>
            <TabContent id={"2"}>
              <CacheSettings />
            </TabContent>
          </TabContentWrap>
        </Styled.TabLayout>
      </Tabs>
    </Styled.FullH>
  );
}

export default SettingsMenu;
