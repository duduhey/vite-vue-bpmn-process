import { defineComponent } from 'vue'
import { NButton, NButtonGroup, NPopover } from 'naive-ui'
import EventEmitter from '@/utils/EventEmitter'
import type Modeler from 'bpmn-js/lib/Modeler'
import type ToggleMode from 'bpmn-js-token-simulation/lib/features/toggle-mode/modeler/ToggleMode'
import type CommandStack from 'diagram-js/lib/command/CommandStack'
import { createNewDiagram } from '@/utils'
import LucideIcon from '@/components/common/LucideIcon.vue'
import modeler from '@/store/modeler'

const Commands = defineComponent({
  name: 'Commands',
  setup() {
    let command: CommandStack | null = null

    EventEmitter.on('modeler-init', (modeler: Modeler) => {
      command = modeler.get<CommandStack>('commandStack')
    })

    const undo = () => {
      command && command.canUndo() && command.undo()
    }

    const redo = () => {
      command && command.canRedo() && command.redo()
    }

    const restart = () => {
      command && command.clear()
      createNewDiagram()
    }

    const mockSimulation = () => {
      modeler().getModeler!.get<ToggleMode>('toggleMode').toggleMode()
    }

    return () => (
      <NButtonGroup>
        <NPopover
          v-slots={{
            default: () => '撤销',
            trigger: () => (
              <NButton onClick={undo}>
                <LucideIcon name="Undo2" size={16}></LucideIcon>
              </NButton>
            )
          }}
        ></NPopover>
        <NPopover
          v-slots={{
            default: () => '恢复',
            trigger: () => (
              <NButton onClick={redo}>
                <LucideIcon name="Redo2" size={16}></LucideIcon>
              </NButton>
            )
          }}
        ></NPopover>
        <NPopover
          v-slots={{
            default: () => '擦除重做',
            trigger: () => (
              <NButton onClick={restart}>
                <LucideIcon name="Eraser" size={16}></LucideIcon>
              </NButton>
            )
          }}
        ></NPopover>
        <NPopover
          v-slots={{
            default: () => '测试模拟',
            trigger: () => (
              <NButton onClick={mockSimulation}>
                <LucideIcon name="Bot" size={16}></LucideIcon>
              </NButton>
            )
          }}
        ></NPopover>
      </NButtonGroup>
    )
  }
})

export default Commands
