import styled from '@xstyled/styled-components'

const DatePickerWrapper = styled.div`
  width: 100%;

  .react-datepicker-wrapper {
    width: 100%;

    .react-datepicker__input-container {
      > input {
        width: 100%;
      }
    }
  }

  .react-datepicker__tab-loop {
    position: relative;

    .react-datepicker-popper {
      .react-datepicker {
        font-family: inherit;
        font-size: sm;
        color: content-default;
        background-color: layout-level0;
        border: 0;
        box-shadow: 2;
        border-radius: 3;
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
          background-color: layout-level0;
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
                padding-top: 2;

                .react-datepicker__time-list-item {
                  height: auto;
                  padding: 2 3;
                  margin-bottom: 2;
                  color: content-default;
                  text-align: right;
                }

                .react-datepicker__time-list-item--selected {
                  background-color: brand-primary;
                  color: layout-level0;
                  font-weight: normal;
                }
              }
            }
          }
        }

        .react-datepicker__month-container {
          .react-datepicker-year-header {
            color: content-contrast;
            font-size: default;
          }

          .react-datepicker__header {
            background-color: layout-level0;
            padding: 3;
            border: 0;
            border-radius: 3;

            .react-datepicker__current-month {
              color: content-contrast;
              font-size: sm;
            }

            .react-datepicker__day-names {
              display: flex;
              justify-content: space-around;
              margin-top: 3;

              .react-datepicker__day-name {
                color: content-default;
                font-weight: bold;
                width: auto;
                height: auto;
                line-height: 1;
                flex: 1 1 0;
              }
            }
          }

          .react-datepicker__month {
            padding: 3;
            padding-top: 0;
            margin: 0;
            border-radius: 3;

            .react-datepicker__month-wrapper {
              display: flex;
              align-items: center;
              justify-content: space-around;
              gap: 2;

              &:not(:last-child) {
                padding-bottom: 2;
              }
            }

            .react-datepicker__month-text {
              margin: 0;
              width: auto;
              flex: 1 1 0;
              padding: 2 3;

              background-color: layout-level0;
            }

            .react-datepicker__month-text--keyboard-selected {
              background-color: brand-primary;
              color: layout-level0;
              border-radius: 3;
            }

            .react-datepicker__month-text--today {
              border: 1px solid;
              border-color: brand-primary;
              box-sizing: border-box;
              border-radius: 3;
              font-weight: normal;
            }

            .react-datepicker__week {
              display: flex;
              align-items: center;
              justify-content: space-around;

              .react-datepicker__day,
              .react-datepicker__day--keyboard-selected,
              .react-datepicker__day--keyboard-selected,
              .react-datepicker__month-text--keyboard-selected,
              .react-datepicker__quarter-text--keyboard-selected,
              .react-datepicker__year-text--keyboard-selected {
                color: content-default;
                background-color: layout-level0;
                line-height: 1;
                flex: 1 1 0;
                padding: 2;
                width: auto;
                height: auto;
              }

              .react-datepicker__day--outside-month {
                color: content-nonessential;
              }

              .react-datepicker__day--selected {
                background-color: brand-primary;
                color: layout-level0;
                border-radius: 3;
              }

              .react-datepicker__day--disabled {
                color: content-nonessential;

                .react-datepicker__day--today {
                  font-weight: bold;
                  text-decoration: underline;
                }

                .react-datepicker__day--in-range {
                  background-color: brand-primary;
                  color: layout-level0;
                  border-radius: 3;
                }

                .react-datepicker__day--in-selecting-range {
                  background-color: brand-primary;
                }

                .react-datepicker__day--in-selecting-range:not(.react-datepicker__day--in-range, .react-datepicker__month-text--in-range, .react-datepicker__quarter-text--in-range, .react-datepicker__year-text--in-range) {
                  background-color: brand-primary;
                  color: layout-level0;
                  border-radius: 3;
                }
              }
            }
          }
        }
      }
    }
  }
`

export default DatePickerWrapper
