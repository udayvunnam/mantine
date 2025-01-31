import React, { createElement, forwardRef } from 'react';
import { DefaultProps, MantineSize, ClassNames, useExtractedMargins } from '@mantine/styles';
import { Text } from '../Text/Text';
import useStyles from './InputWrapper.styles';

export type InputWrapperStylesNames = ClassNames<typeof useStyles>;

export interface InputWrapperBaseProps {
  /** Input label, displayed before input */
  label?: React.ReactNode;

  /** Input description, displayed after label */
  description?: React.ReactNode;

  /** Displays error message after input */
  error?: React.ReactNode;

  /** Adds red asterisk on the right side of label */
  required?: boolean;

  /** Props spread to label element */
  labelProps?: React.ComponentPropsWithoutRef<'label'> & { [key: string]: any };

  /** Props spread to description element */
  descriptionProps?: React.ComponentPropsWithoutRef<'div'> & { [key: string]: any };

  /** Props spread to error element */
  errorProps?: React.ComponentPropsWithoutRef<'div'> & { [key: string]: any };
}

export interface InputWrapperProps
  extends DefaultProps<InputWrapperStylesNames>,
    InputWrapperBaseProps,
    React.ComponentPropsWithoutRef<'div'> {
  /** Input that should be wrapped */
  children: React.ReactNode;

  /** htmlFor label prop */
  id?: string;

  /** Render label as label with htmlFor or as div */
  labelElement?: 'label' | 'div';

  /** Controls all elements font-size */
  size?: MantineSize;

  /** Static css selector base */
  __staticSelector?: string;
}

export const InputWrapper = forwardRef<HTMLDivElement, InputWrapperProps>(
  (
    {
      className,
      style,
      label,
      children,
      required,
      id,
      error,
      description,
      labelElement = 'label',
      labelProps,
      descriptionProps,
      errorProps,
      classNames,
      styles,
      sx,
      size = 'sm',
      __staticSelector = 'InputWrapper',
      ...others
    }: InputWrapperProps,
    ref
  ) => {
    const { classes, cx } = useStyles({ size }, { classNames, styles, sx, name: __staticSelector });
    const { mergedStyles, rest } = useExtractedMargins({ others, style });
    const _labelProps = labelElement === 'label' ? { htmlFor: id } : {};
    const inputLabel = createElement(
      labelElement,
      {
        ..._labelProps,
        ...labelProps,
        id: id ? `${id}-label` : undefined,
        className: classes.label,
      },
      <>
        {label}
        {required && <span className={classes.required}> *</span>}
      </>
    );

    return (
      <div className={cx(classes.root, className)} style={mergedStyles} ref={ref} {...rest}>
        {label && inputLabel}

        {description && (
          <Text {...descriptionProps} color="gray" className={classes.description}>
            {description}
          </Text>
        )}

        {children}

        {typeof error !== 'boolean' && error && (
          <Text {...errorProps} size={size} className={classes.error}>
            {error}
          </Text>
        )}
      </div>
    );
  }
);

InputWrapper.displayName = '@mantine/core/InputWrapper';
