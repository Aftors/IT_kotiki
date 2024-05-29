import { Checkbox, Drawer, Form, Select, Switch, Typography } from 'antd'
import styled from 'styled-components'
import * as palette from '../../constants/color'
import { ILeaderboardControlsProps } from './models/models'

const { Text } = Typography

const ControlsDrawer = styled(Drawer)`
  &.ant-drawer-content {
    border-radius: 12px 0 0 12px;
    background-color: ${palette.BACKGROUND};

    .ant-drawer-header {
      display: none;
    }

    .ant-drawer-body {
      display: flex;
      flex-direction: column;
      justify-content: center;
      height: 100%;
    }
  }
`

const FilterText = styled(Text)`
  color: ${palette.DEEP_PINK};
`

const FilterBoldText = styled(FilterText)`
  font-weight: bold;
`

const SorterText = styled(Text)`
  color: ${palette.DEEP_PINK};
`

const ControlsSwitch = styled(Switch)`
  &.ant-switch.ant-switch-checked {
    background: ${palette.DEEP_PINK};
    &:hover {
      background: ${palette.DEEP_PINK};
    }
  }
`

const ControlsSelect = styled(Select)`
  && {
    .ant-select-selector {
      border-radius: 12px;
      border: 1px solid ${palette.DEEP_PINK};
      .ant-select-selection-item {
        color: ${palette.DEEP_PINK};
      }
    }
  }
`

const ControlsCheckbox = styled(Checkbox)`
  & {
    .ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner,
    .ant-checkbox-checked:hover .ant-checkbox-inner,
    .ant-checkbox-checked .ant-checkbox-inner {
      background-color: ${palette.DEEP_PINK};
      border-color: ${palette.DEEP_PINK};
    }
  }
`

const selectOptions = [
  {
    value: 'playerName',
    label: 'Имя игрока',
  },
  {
    value: 'scoreMax',
    label: 'Личный рекорд',
  },
]

export const LeaderboardControls: React.FC<ILeaderboardControlsProps> = ({
  isOpen,
  onClose,
  onSorterChange,
  onFilterChange,
}) => {
  return (
    <ControlsDrawer open={isOpen} onClose={onClose} width={328}>
      <Form
        onFieldsChange={(_, fields) => onSorterChange(fields)}
        initialValues={{ value: 'scoreMax' }}>
        <Form.Item
          name="order"
          label={<FilterBoldText>Возрастание/убывание</FilterBoldText>}
          colon={false}>
          <ControlsSwitch />
        </Form.Item>
        <Form.Item
          name="value"
          label={<FilterText>Сортировка по:</FilterText>}
          labelCol={{ span: 24 }}>
          <ControlsSelect options={selectOptions} />
        </Form.Item>
      </Form>
      <Form onFieldsChange={(_, fields) => onFilterChange(fields)}>
        <Form.Item name="top" valuePropName="checked">
          <ControlsCheckbox>
            <SorterText>Показать ТОП-10</SorterText>
          </ControlsCheckbox>
        </Form.Item>
      </Form>
    </ControlsDrawer>
  )
}
