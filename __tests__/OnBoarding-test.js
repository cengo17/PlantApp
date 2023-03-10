import React from 'react';
import { render, fireEvent } from "@testing-library/react-native";
import Onboarding from '../src/component/OnBoarding/OnBoarding';

describe('<Onboarding />', () => {
  test('renders continue button', () => {
    const { getByTestId } = render(<Onboarding />);
    const continueButton = getByTestId('continue-button');
    expect(continueButton).toBeTruthy();
  });

  test('goes to the next slide on continue button press', () => {
    const { getByTestId } = render(<Onboarding />);
    const continueButton = getByTestId('continue-button');
    fireEvent.press(continueButton);
  });
});
