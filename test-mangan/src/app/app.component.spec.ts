import { TestBed, async, ComponentFixture } from "@angular/core/testing";
import { AppComponent } from "./app.component";

describe("AppComponent", () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AppComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe("logout", () => {
    /*
     * Params:
     *
     */

    it("should work", () => {
      expect(component.logout()).toBe();
    });

    it("shouldnt work", () => {
      expect(component.logout()).not.toBe();
    });
  });

  describe("submitForm", () => {
    /*
     * Params:
     *
     */

    it("should work", () => {
      expect(component.submitForm()).toBe();
    });

    it("shouldnt work", () => {
      expect(component.submitForm()).not.toBe();
    });
  });

  describe("updateUser", () => {
    /*
     * Params:
     * values: Object
     */

    it("should work", () => {
      expect(component.updateUser(values)).toBe();
    });

    it("shouldnt work", () => {
      expect(component.updateUser(values)).not.toBe();
    });
  });
});
