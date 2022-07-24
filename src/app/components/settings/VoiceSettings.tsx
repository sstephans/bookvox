import styled from 'styled-components';
import { Radio, RadioGroup, Slider, TextArea } from '@blueprintjs/core';
import DropdownChooser from '../DropdownChooser';
import { VoiceIds } from '../../../shared/types/AwsConstants';
import Label from '../Label';
import { useState } from 'react';
import ButtonPlayer from '../ButtonPlayer';

interface VoiceSettingsProps {
  Engine: string;
  setEngine(engine: string): void;
  VoiceId: string;
  setVoiceId(voiceId: string): void;
  speed: string;
  setSpeed(speed: string): void;
}

const Column = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const Row = styled.div`
  display: flex;
  flex-direction: row;
`;

const StyledTextArea = styled(TextArea)`
  flex: 1;
  margin-left: 32px;
`;

const VoiceSettings = ({
  Engine,
  setEngine,
  VoiceId,
  setVoiceId,
  speed,
  setSpeed,
}: VoiceSettingsProps) => {
  const [sliderPosition, setSliderPosition] = useState(
    parseFloat(speed.replace('%', '')) / 100
  );

  const renderSliderLabel = (value: number) => {
    return `${Math.round(value * 100)}%`;
  };

  const updateSpeedSetting = () => {
    setSpeed(renderSliderLabel(sliderPosition));
  };

  return (
    <Row>
      <Column>
        <div>
          <Label>AWS Polly Engine</Label>
          <RadioGroup
            onChange={(e) => setEngine(e.currentTarget.value)}
            selectedValue={Engine}
            inline
          >
            {/* TODO custom radio button with descriptions like the polly tester on aws dashboard */}
            <Radio label={'Standard'} value={'standard'} />
            <Radio label={'Neural'} value={'neural'} />
          </RadioGroup>
        </div>
        <DropdownChooser
          label={'Voice'}
          options={VoiceIds}
          selected={VoiceId}
          setSelection={setVoiceId}
        />
        <div>
          <Label>Speed</Label>
          <Slider
            min={0.1}
            max={1.5}
            stepSize={0.05}
            labelStepSize={1.4}
            labelRenderer={renderSliderLabel}
            value={sliderPosition}
            onChange={setSliderPosition}
            onRelease={updateSpeedSetting}
          />
        </div>
        <ButtonPlayer />
      </Column>
      <StyledTextArea placeholder={'Enter sample text...'} maxLength={300} />
    </Row>
  );
};

export default VoiceSettings;
