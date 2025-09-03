"use client";
import React from "react";
import { useAccessibility } from "@/context/AccessibilityContext";

type StepControl = {
    currentLevel: number;
    min: number;
    max: number;
    settingKey: "fontSize" | "letterSpacing" | "lineHeight";
    label: string;
    direction?: "positive" | "negative";
    disabled?: boolean;
};

type ToggleSettingKey =
    | "highlightLinks"
    | "dyslexiaFont"
    | "darkMode"
    | "invertColors"
    | "hideImages"
    | "screenReader"
    | "largeCursor";

const AccessibilityPanel: React.FC = () => {
    const {
        fontSize,
        lineHeight,
        letterSpacing,
        highlightLinks,
        dyslexiaFont,
        darkMode,
        invertColors,
        hideImages,
        screenReader,
        largeCursor,
        toggleSetting,
        toggleResetSetting
    } = useAccessibility();

    const currentFontSize = parseInt(fontSize.replace("level", ""));
    const currentLetterSpacing = parseInt(letterSpacing.replace("level", ""));
    const currentLineHeight = parseInt(lineHeight.replace("level", ""));

    // Handler for step controls
    const handleStepChange = (
        key: StepControl["settingKey"],
        direction: "increase" | "decrease" | "positive-only",
        max: number,
        min: number = 0
    ) => {
        const currentValue = parseInt(({
            fontSize,
            lineHeight,
            letterSpacing
        }[key].replace("level", "")));

        let nextValue = currentValue;

        if (direction === "increase") {
            nextValue = currentValue >= max ? min : currentValue + 1;
        }
        else if (direction === "decrease") {
            nextValue = currentValue <= min ? max : currentValue - 1;
        }
        else {
            nextValue = currentValue >= max ? min : currentValue + 1;
        }

        toggleSetting(key, `level${nextValue}`);
    };

    // Configuration for step controls
    const stepControls: StepControl[] = [
        {
            currentLevel: Math.max(0, currentFontSize),
            min: 0,
            max: 4,
            settingKey: "fontSize",
            label: "Bigger Text",
            direction: "positive",
            disabled: currentFontSize < 0,
        },
        {
            currentLevel: Math.abs(Math.min(0, currentFontSize)),
            min: -4,
            max: 0,
            settingKey: "fontSize",
            label: "Smaller Text",
            direction: "negative",
            disabled: currentFontSize > 0,
        },
        {
            currentLevel: currentLetterSpacing,
            min: 0,
            max: 3,
            settingKey: "letterSpacing",
            label: "Letter Spacing",
            direction: "positive",
        },
        {
            currentLevel: currentLineHeight,
            min: 0,
            max: 3,
            settingKey: "lineHeight",
            label: "Line Height",
            direction: "positive",
        },
    ];

    const handleReset = () => {
        toggleResetSetting();
    };

    // Toggle settings configuration
    const toggleSettings: { label: string; value: boolean; key: ToggleSettingKey }[] = [
        { label: "Highlight Links", value: highlightLinks, key: "highlightLinks" },
        { label: "Dyslexia-friendly Font", value: dyslexiaFont, key: "dyslexiaFont" },
        { label: "Dark Mode", value: darkMode, key: "darkMode" },
        { label: "Invert Colors", value: invertColors, key: "invertColors" },
        { label: "Hide Images", value: hideImages, key: "hideImages" },
        { label: "Enable Screen Reader", value: screenReader, key: "screenReader" },
        { label: "Large Cursor", value: largeCursor, key: "largeCursor" },
    ];

    return (
        <div className="accessibility-panel">
            <h3 className="panel-title">Accessibility Settings</h3>

            {/* Step controls */}
            {stepControls.map(({ currentLevel, max, min, settingKey, label, disabled, direction }) => (
                <div className="step-control-wrapper" key={label}>
                    <button
                        onClick={() => handleStepChange(
                            settingKey,
                            direction === "positive" ? "increase" : "decrease",
                            max,
                            min
                        )}
                        disabled={disabled}
                        className="step-button"
                    >
                        {label}
                    </button>

                    {currentLevel !== 0 && (
                        <div className="step-indicator">
                            {Array.from({ length: max - min }).map((_, index) => (
                                <span
                                    key={index}
                                    className={`step-dot ${index < currentLevel ? "active" : ""
                                        }`}
                                >
                                    ●
                                </span>
                            ))}
                        </div>
                    )}
                </div>
            ))}

            {/* Toggle controls */}
            {toggleSettings.map(({ label, value, key }) => (
                <div className="toggle-control" key={key}>
                    <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => toggleSetting(key, e.target.checked)}
                        id={key}
                        aria-labelledby={key}
                    />
                    <label htmlFor={key}>{label}</label>
                </div>
            ))}

            <button
                type="button"
                aria-label="Reset Settings"
                onClick={handleReset}
            >
                Reset Settings
            </button>
        </div>
    );
};

export default AccessibilityPanel;