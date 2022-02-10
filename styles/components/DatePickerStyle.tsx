import styled from 'styled-components'

const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;
  }

  .react-datepicker__tab-loop {
    position: relative;

    .react-datepicker-popper {
      .react-datepicker {
        font-family: inherit;
        font-size: ${({ theme }) => theme.fontSizes[1]}px;
        border: 0;
        box-shadow: 0 0 16px 1px rgba(1, 1, 1, 0.1);
        border-radius: ${({ theme }) => `${theme.radii[3]}px`};
        overflow: hidden;

        .react-datepicker__triangle {
          visibility: hidden;
        }

        .react-datepicker__navigation {
          top: 16px;
          width: 14px;
          height: 14px;
        }
        .react-datepicker__navigation-icon {
          top: 0;

          &::before {
            top: 8px;
          }
        }
        .react-datepicker__navigation-icon--next {
          left: 0;
        }
        .react-datepicker__navigation-icon--previous {
          right: 0;
        }

        .react-datepicker__navigation--previous {
          left: 16px;
        }
        .react-datepicker__navigation--next {
          right: 16px;
        }

        .react-datepicker__time-container {
          width: auto;
          background-color: ${({ theme: { colors } }) => colors.layout.level0};
          border-radius: 0;

          .react-datepicker__header {
            height: 0;
            border: 0;

            &--time {
              padding: 0;
            }
          }

          .react-datepicker__time {
            background-color: transparent;

            .react-datepicker__time-box {
              width: auto;

              .react-datepicker__time-list {
                height: calc(30px * 5 + 15px);
                padding-top: ${({ theme }) => `${theme.space[1]}px`};

                .react-datepicker__time-list-item {
                  height: auto;
                  padding: ${({ theme }) =>
                    `${theme.space[1]}px ${theme.space[2]}px`};
                  margin-bottom: ${({ theme }) => `${theme.space[1]}px`};
                  color: ${({ theme: { colors } }) => colors.content.default};
                  text-align: right;
                }

                .react-datepicker__time-list-item--selected {
                  background-color: ${({ theme: { colors } }) =>
                    colors.brand.primary};
                  color: ${({ theme: { colors } }) => colors.layout.level0};
                  font-weight: normal;
                }
              }
            }
          }
        }

        .react-datepicker__month-container {
          .react-datepicker__header {
            background-color: ${({ theme: { colors } }) =>
              colors.layout.level0};
            padding: ${({ theme }) => `${theme.space[2]}px`};
            border: 0;
            border-radius: ${({ theme }) => `${theme.radii[3]}px`};

            .react-datepicker__current-month {
              color: ${({ theme: { colors } }) => colors.content.contrast};
              font-size: ${({ theme }) => theme.fontSizes[1]}px;
            }

            .react-datepicker__day-names {
              display: flex;
              justify-content: space-around;
              margin-top: ${({ theme }) => `${theme.space[2]}px`};

              .react-datepicker__day-name {
                color: ${({ theme: { colors } }) => colors.content.default};
                font-weight: bold;
                width: auto;
                height: auto;
                line-height: 1;
                flex: 1 1 0;
              }
            }
          }

          .react-datepicker__month {
            padding: ${({ theme }) => `${theme.space[2]}px`};
            padding-top: 0;
            margin: 0;
            border-radius: ${({ theme }) => `${theme.radii[3]}px`};

            .react-datepicker__month-wrapper {
              display: flex;
              align-items: center;
              justify-content: space-around;
              gap: ${({ theme }) => `${theme.space[1]}px `};

              &:not(:last-child) {
                padding-bottom: ${({ theme }) => `${theme.space[1]}px `};
              }
            }

            .react-datepicker__month-text {
              margin: 0;
              width: auto;
              flex: 1 1 0;
              padding: ${({ theme }) =>
                `${theme.space[1]}px ${theme.space[2]}px `};

              background-color: ${({ theme: { colors } }) =>
                colors.layout.level0};
            }

            .react-datepicker__month-text--keyboard-selected {
              background-color: ${({ theme: { colors } }) =>
                colors.brand.primary};
              color: ${({ theme: { colors } }) => colors.layout.level0};
              border-radius: ${({ theme }) => `${theme.radii[3]}px`};
            }

            .react-datepicker__month-text--today {
              border: 1px solid
                ${({ theme: { colors } }) => colors.brand.primary};
              box-sizing: border-box;
              border-radius: ${({ theme }) => `${theme.radii[3]}px`};
              font-weight: normal;
            }

            .react-datepicker__week {
              display: flex;
              align-items: center;
              justify-content: space-around;
              /* gap: ${({ theme }) => `${theme.space[1]}px `}; */

              .react-datepicker__day,
              .react-datepicker__day--keyboard-selected,
              .react-datepicker__day--keyboard-selected,
              .react-datepicker__month-text--keyboard-selected,
              .react-datepicker__quarter-text--keyboard-selected,
              .react-datepicker__year-text--keyboard-selected {
                color: ${({ theme: { colors } }) => colors.content.default};
                background-color: ${({ theme: { colors } }) =>
                  colors.layout.level0};
                line-height: 1;
                flex: 1 1 0;
                padding: ${({ theme }) => `${theme.space[1]}px  `};
                width: auto;
                height: auto;
              }

              .react-datepicker__day--outside-month {
                color: ${({ theme: { colors } }) =>
                  colors.content.nonessential};
              }

              .react-datepicker__day--selected {
                background-color: ${({ theme: { colors } }) =>
                  colors.brand.primary};
                color: ${({ theme: { colors } }) => colors.layout.level0};
                border-radius: ${({ theme }) => `${theme.radii[3]}px`};
              }

              .react-datepicker__day--disabled {
                color: ${({ theme: { colors } }) =>
                  colors.content.nonessential};
              }

              .react-datepicker__day--today {
                /* border: 1px solid
                  ${({ theme: { colors } }) => colors.brand.primary}; */
                /* box-sizing: border-box; */
                /* border-radius: ${({ theme }) => `${theme.radii[3]}px`}; */
                font-weight: bold;
                text-decoration: underline;
              }

              .react-datepicker__day--in-range {
                background-color: ${({ theme: { colors } }) =>
                  colors.brand.primary};
                color: ${({ theme: { colors } }) => colors.layout.level0};
                border-radius: ${({ theme }) => `${theme.radii[3]}px`};
              }

              .react-datepicker__day--in-selecting-range {
                background-color: ${({ theme: { colors } }) =>
                  colors.brand.primary};
              }

              .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range) {
                background-color: ${({ theme: { colors } }) =>
                  colors.brand.primary};
                color: ${({ theme: { colors } }) => colors.layout.level0};
                border-radius: ${({ theme }) => `${theme.radii[3]}px`};
              }
            }
          }
        }
      }
    }
  }
`

export default DatePickerWrapper
